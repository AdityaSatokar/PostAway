import express from "express";
import FriendshipController from "./friendship.controller.js";

const friendshipRouter = express.Router();
const controller = new FriendshipController();

friendshipRouter.route("/get-friends/:userid").get(controller.getFriends);
friendshipRouter.route("/get-pending-requests").get(controller.getRequests);
friendshipRouter.route("/toggle-friendship/:friendid").get(controller.toggleFriendship);
friendshipRouter.route("/:response/:friendid").get(controller.response);

export default friendshipRouter;