import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../helpers/ErrorResponse";
import { jwtVerifyToken } from "../helpers/Jwt";
import { JwtTokenInterface } from "../interfaces/Services.interface";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const Authorization = req.get("Authorization");
  if (!Authorization)
    return next(new ErrorResponse("Missing Or Invalid Access Token", 400));
  const token = Authorization.split(" ")[1];
  try {
    const user : JwtTokenInterface = jwtVerifyToken(
      token,
      <string>process.env.ACCESS_TOKEN_KEY
    ) as any;
    req.user = user;
    next()
  } catch (err) {
    next(err);
  }
};

export default userAuth;
