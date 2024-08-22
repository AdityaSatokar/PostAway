import express from "express";
import OTPController from "./otp.controller.js";

const otpRouter = express.Router();
const controller = new OTPController();

otpRouter.route("/send").post(controller.sendOTP);
otpRouter.route("/verify").post(controller.verifyOTP);
otpRouter.route("/reset-password").post(controller.resetPassword);

export default otpRouter;