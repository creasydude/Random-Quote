import { Response } from "express";
import { SuccessResponseInterface } from "../interfaces/Helpers.interface";

const SuccessResponse = (res: Response, statusCode: number, data: object) => {
  const successObj: SuccessResponseInterface = {
    success: true,
    ...data,
  };
  return res.status(statusCode).json(successObj);
};

export default SuccessResponse;