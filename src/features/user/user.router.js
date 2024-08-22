import express from "express";
import UserController from "./user.controller.js"
import jwtAuthentication from "../../middleware/JWTAuthorization.middleware.js";

const userRouter = express.Router();
const controller = new UserController;

userRouter.route("/signup").post(controller.signup);
userRouter.route("/signin").post(controller.signin);
userRouter.route("/logout").get(jwtAuthentication,controller.logout);
userRouter.route("/logout-all-devices").get(jwtAuthentication,controller.logoutAll);
userRouter.route("/get-details/:userid").get(jwtAuthentication,controller.getDetails);
userRouter.route("/get-all-details").get(jwtAuthentication,controller.getAllDetails);
userRouter.route("/update-details/:userid").put(jwtAuthentication,controller.updateDetails);

export default userRouter;