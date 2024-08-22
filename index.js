import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import invalidRouteHandler from "./src/middleware/invalidRouteHandler.middleware.js";
import connectToDB from "./src/config/database.config.js";
import userRouter from "./src/features/user/user.router.js";
import postRouter from "./src/features/post/post.router.js";
import commentRouter from "./src/features/comment/comment.router.js";
import likeRouter from "./src/features/like/like.router.js";
import friendshipRouter from "./src/features/friendship/friendship.router.js";
import otpRouter from "./src/features/otp/otp.router.js";
import errorHandler from "./src/middleware/errorHandler.middleware.js";
import jwtAuthentication from "./src/middleware/JWTAuthorization.middleware.js";

//CONFIGURATIONS
const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(
    session({
        secret:"secretkey",
        saveUninitialized:true,
        cookie:{maxAge:(1*60*60*1000)},
        resave:false
    })
);
server.use(loggerMiddleware);

//ROUTES
server.use("/api/users",userRouter);
server.use("/api/posts",jwtAuthentication,postRouter);
server.use("/api/comments",jwtAuthentication,commentRouter);
server.use("/api/likes",jwtAuthentication,likeRouter);
server.use("/api/friends",jwtAuthentication,friendshipRouter);
server.use("/api/otp",otpRouter);
server.use("/",(req,res,next)=>res.status(200).send("welcome to postaway 2.0!!!"));

//ERROR HANDLER MIDDLEWARE
server.use(invalidRouteHandler);
server.use(errorHandler);

server.listen(3200,()=>{
    connectToDB();
    console.log("server is listening on port 3200!!!");
});