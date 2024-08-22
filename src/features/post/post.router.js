import express from "express";
import imageUpload from "../../middleware/fileUpload.middleware.js";
import PostController from "./post.controller.js";

const postRouter = express.Router();
const controller = new PostController();

postRouter.route("/all").get(controller.getAll);
postRouter.route("/:postid").get(controller.getPostById);
postRouter.route("/").get(controller.getUserPosts);
postRouter.route("/").post(imageUpload.single("image"),controller.postUpload);
postRouter.route("/:postid").delete(controller.deletePost);
postRouter.route("/:postid").put(imageUpload.single("image"),controller.updatePost);

export default postRouter;