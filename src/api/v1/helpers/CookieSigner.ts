import { Response } from "express";
import { CookieOptionsInterface } from "../interfaces/Helpers.interface";
const CookieSigner = (res: Response, value: string) => {
  let options: CookieOptionsInterface = {
    maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1month
    httpOnly: true,
    secure: false,
    signed: true,
  };
  res.cookie("Authorization", value, options);
};

export default CookieSigner;
