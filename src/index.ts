import express, { Application, Request, Response, NextFunction } from "express";
import { swaggerUIServe, swaggerUISetup } from "./config/swagger/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from 'cors';
import logger from "./config/Logger";
import errorHandler from "./api/v1/middlewares/errorHandler";
import connectDB from "./config/DB";
import authRoute from "./api/v1/routes/auth.route";
import quoteRoute from "./api/v1/routes/quote.route";

//Deps
const app: Application = express();
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser(<string>process.env.COOKIE_SEC));
connectDB();

//Routes
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/quote/", quoteRoute);

//API Docs
if (<string>process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUIServe, swaggerUISetup);
}

//Error Handlers
app.use(errorHandler);

//404 Route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

//Listen
const PORT: number = parseInt(<string>process.env.PORT || "5000");
const server = app.listen(PORT, () => {
  logger.info(`Server Running On ${PORT}`);
});
process.on("unhandledRejection", (err: any) => {
  logger.error(err);
  server.close((): void => process.exit(1));
});
