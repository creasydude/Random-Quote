import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../helpers/ErrorResponse";
import SuccessResponse from "../helpers/SuccessResponse";
import CookieSigner from "../helpers/CookieSigner";
import {
  registerService,
  validationResendService,
  registerConfirmService,
  loginService,
  refreshTokenService,
} from "../services/auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, registerAccessKey } = req.body;
  if (!email || !password || !registerAccessKey)
    return next(new ErrorResponse("Enter Credentials", 400));
  if (registerAccessKey !== <string>process.env.REGISTER_ACCESS_KEY)
    return next(new ErrorResponse("Invalid Access Key", 400));
  try {
    const user = await registerService(email, password);
    SuccessResponse(res, 201, { user });
  } catch (err) {
    next(err);
  }
};

export const validationResendController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  if (!email) return next(new ErrorResponse("Enter Credentials", 400));
  try {
    const user = await validationResendService(email);
    SuccessResponse(res, 201, { user });
  } catch (err) {
    next(err);
  }
};

export const registerConfirmController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { emailValidationKey } = req.params;
  if (!emailValidationKey)
    return next(new ErrorResponse("Enter Validation Key", 400));
  try {
    const user = await registerConfirmService(emailValidationKey);
    SuccessResponse(res, 201, { user });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse("Enter Credentials", 400));
  try {
    const { accessToken, refreshToken } = await loginService(email, password);
    CookieSigner(res, `Bearer ${refreshToken}`);
    SuccessResponse(res, 200, { accessToken: `Bearer ${accessToken}` });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Authorization } = req.signedCookies;
  if (!Authorization)
    return next(new ErrorResponse("Missing Or Invalid Token", 400));
  const token = Authorization.split(" ")[1];
  try {
    const accessToken = await refreshTokenService(token);
    SuccessResponse(res, 200, { accessToken: `Bearer ${accessToken}` });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Authorization } = req.signedCookies;
  if (!Authorization)
    return next(new ErrorResponse("Missing Or Invalid Token", 400));
  try {
    res.clearCookie("Authorization");
    SuccessResponse(res, 200, { message: "Logged Out" });
    res.end();
  } catch (err) {
    next(err);
  }
};
