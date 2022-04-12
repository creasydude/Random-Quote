import { NextFunction, Request, Response } from "express";
import client from "../../../config/Redis";
import SuccessResponse from "../helpers/SuccessResponse";

const quoteCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await client.connect();
    const value: string = (await client.get("quote")) as any;
    await client.disconnect();
    if (!value) return next();
    const quote = JSON.parse(value);
    SuccessResponse(res, 200, { quote });
  } catch (err) {
    next(err);
  }
};

export default quoteCache;
