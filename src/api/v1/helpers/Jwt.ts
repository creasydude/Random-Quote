import jwt from "jsonwebtoken";

export const jwtSignValue = (value: object, time: string, secret: string) => {
  return jwt.sign(value, secret, { expiresIn: time });
};

export const jwtVerifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
