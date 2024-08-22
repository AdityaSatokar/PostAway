import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();
const controller = new CommentController();

commentRouter.route("/:postid").get(controller.getComments);
commentRouter.route("/:postid").post(controller.postComment);
commentRouter.route("/:commentid").put(controller.updateComment);
commentRouter.route("/:commentid").delete(controller.deleteComment);

export default commentRouter;