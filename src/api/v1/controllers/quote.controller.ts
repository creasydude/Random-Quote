import { Request, Response, NextFunction } from "express";
import SuccessResponse from "../helpers/SuccessResponse";
import ErrorResponse from "../helpers/ErrorResponse";
import { addQuoteService , showQuoteService } from "../services/quote.service";

export const addQuoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quote, author } = req.body;
  if (!quote || !author)
    return next(new ErrorResponse("Missing Credentials", 400));
  try {
    const theQoute = await addQuoteService(quote, author);
    SuccessResponse(res, 201, { theQoute });
  } catch (err) {
    next(err);
  }
};

export const showRandomQuoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const quote = await showQuoteService()
        SuccessResponse(res,200,{quote})

    } catch(err) {
        next(err)
    }
};
