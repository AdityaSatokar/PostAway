import express from "express";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();
const controller = new LikeController();

likeRouter.route("/:id").get(controller.getLikes);
likeRouter.route("/toggle/:id").get(controller.toggleLikes);//like is successfully creating/deleting but have to implement in such a way that the record from post/comment.likes array should also be updated!!

export default likeRouter;