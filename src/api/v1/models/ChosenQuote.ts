import { Schema, model } from "mongoose";
import { ChosenQuoteInterface } from "../interfaces/Models.interface";

const chosenQuoteSchema = new Schema<ChosenQuoteInterface>({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
    index: { expires: "1m" }
  }
});

const ChosenQuote = model<ChosenQuoteInterface>("ChosenQuote", chosenQuoteSchema);
export default ChosenQuote;
