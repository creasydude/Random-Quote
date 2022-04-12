import ErrorResponse from "../helpers/ErrorResponse";
import User from "../models/User";
import { addTime, compareTime } from "../helpers/Time";
import { JwtTokenInterface } from "../interfaces/Services.interface";
import Generator from "../helpers/Generator";
import logger from "../../../config/Logger";
import { jwtVerifyToken } from "../helpers/Jwt";

const generateVerificationLink = () => {
  const emailValidationKey: string = Generator("numbers+letters", 12);
  const emailValidationExpire: string = addTime(5);
  return { emailValidationKey, emailValidationExpire };
};

export const registerService = async (email: string, password: string) => {
  const { emailValidationExpire, emailValidationKey } =
    generateVerificationLink();
  const userExist = await User.findOne({ email });
  if (userExist) throw new ErrorResponse("User Already Exist", 400);
  const user = await User.create({
    email,
    password,
    emailValidationKey,
    emailValidationExpire,
  });
  //Send Verification Email Section , For Now I Use Simple Console Log For Code.
  logger.info(
    `User :${user.email}, Verification Code : ${user.emailValidationKey}, Expire Time : ${user.emailValidationExpire}.`
  );
  return user;
};

export const validationResendService = async (email: string) => {
  const { emailValidationExpire, emailValidationKey } =
    generateVerificationLink();
  const user = await User.findOne({ email });
  if (!user) throw new ErrorResponse("User Doesn't Exist", 400);
  if (user?.emailValidated)
    throw new ErrorResponse("User Already Validated", 400);
  if (compareTime(user?.emailValidationExpire!))
    throw new ErrorResponse(
      "Validation Key Already Exist Try Again Later",
      400
    );
  user.emailValidationKey = emailValidationKey;
  user.emailValidationExpire = emailValidationExpire;
  await user.save();
  return user;
};

export const registerConfirmService = async (emailValidationKey: string) => {
  //Note : for a secure app its better to get two params one email another validation key but its simple app so i wont do this.
  const user = await User.findOne({ emailValidationKey });
  if (!user) throw new ErrorResponse("Invalid Validation Key", 400);
  if (!compareTime(user?.emailValidationExpire!))
    throw new ErrorResponse("Validation Key Expired, Get New One", 400);
  user.emailValidated = true;
  user.emailValidationKey = undefined;
  user.emailValidationExpire = undefined;
  await user.save();
  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ErrorResponse("Invalid Credentials", 400);
  if (!(await user.comparePasswords(password)))
    throw new ErrorResponse("Invalid Password", 400);
  const { accessToken, refreshToken } = user.getTokens();
  return { accessToken, refreshToken };
};

export const refreshTokenService = async (token: string) => {
  const { _id }: JwtTokenInterface = jwtVerifyToken(
    token,
    <string>process.env.REFRESH_TOKEN_KEY
  ) as any;
  const user = await User.findById(_id);
  if (!user) throw new ErrorResponse("Invalid Token , User Not Found", 400);
  const { accessToken } = user.getTokens();
  return accessToken;
};
