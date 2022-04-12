import ErrorResponse from "../helpers/ErrorResponse";
import { addTime } from "../helpers/Time";
import ChosenQuote from "../models/ChosenQuote";
import Quote from "../models/Quote";
import client from "../../../config/Redis";

export const addQuoteService = async (quote: string, author: string) => {
  const createQuote = await Quote.create({ quote, author });
  return createQuote;
};

export const showQuoteService = async () => {
  const quotes = await Quote.find();
  if (quotes.length === 0) throw new ErrorResponse("Missing Quotes", 400);
  const chosenQuote = await ChosenQuote.find();
  if (chosenQuote.length === 0) {
    const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)];
    const savedChosenQuote = await ChosenQuote.create({
      quote,
      author,
      expireDate: addTime(60),
    });
    await client.connect()
    await client.SETEX("quote",3600,JSON.stringify(savedChosenQuote));
    await client.disconnect()
    return savedChosenQuote;
  }
  return chosenQuote[0];
};
