import { Request, Response, NextFunction } from "express";
import { ErrorHandlerInterface } from "../interfaces/Helpers.interface";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = { ...err };
  error.message = err.message;

  const bodyObj : ErrorHandlerInterface = {
      success: false,
      message: error.message || "Internal Server Error"
  }
  res.status(error.statusCode || 500).json(bodyObj);
};

export default errorHandler;