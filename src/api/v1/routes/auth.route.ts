import express from "express";
import {
  registerController,
  validationResendController,
  registerConfirmController,
  loginController,
  refreshTokenController,
  logoutController,
} from "../controllers/auth.controller";
const Router = express.Router();

Router.post("/register", registerController);
Router.post("/registerConfirm/:emailValidationKey", registerConfirmController);
Router.post("/validationResend/:email", validationResendController);
Router.post("/login", loginController);
Router.get("/refreshToken", refreshTokenController);
Router.delete("/logout", logoutController);

export default Router;
