import express from "express";
import userAuth from "../middlewares/userAuth";
import { addQuoteController , showRandomQuoteController } from "../controllers/quote.controller";
import quoteCache from "../middlewares/quoteCache";

const Router = express.Router();

Router.post("/add", userAuth, addQuoteController);
Router.get("/showRandom",quoteCache, showRandomQuoteController);

export default Router;
