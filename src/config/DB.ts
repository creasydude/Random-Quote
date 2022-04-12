import mongoose from "mongoose";
import logger from "./Logger";

const connectDB = async () => {
  mongoose.connect(<string>process.env.DB_URI, () => {
    logger.info("Db Connected Successfuly");
  });
};

export default connectDB;
