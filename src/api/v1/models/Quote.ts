import { Schema, model } from "mongoose";
import { QuoteInterface } from "../interfaces/Models.interface";

const quoteSchema = new Schema<QuoteInterface>({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Quote = model<QuoteInterface>("Quote", quoteSchema);
export default Quote;
