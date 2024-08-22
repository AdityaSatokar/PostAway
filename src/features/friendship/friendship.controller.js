import FriendshipRepository from "./friendship.repository.js";
import customError from "../../middleware/errorHandler.middleware.js";

const repository = new FriendshipRepository();

export default class FriendshipController{
    getFriends=async(req,res,next)=>{
        try{
            const userid = req.params.userid;
            const friends = await repository.getFriends(userid);
            if(friends){
                res.status(200).json({success:true,msg:friends});
            }else{
                res.status(404).json({success:false,msg:"user not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while getting friends!")
        }
    }

    getRequests=async(req,res,next)=>{
        try{
            const userid = req.userid;
            const requests = await repository.getRequests(userid);
            if(requests){
                res.status(200).json({success:true,msg:requests});
            }else{
                res.status(404).json({success:false,msg:"no friend requests!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while getting pending requests");
        }
    }

    toggleFriendship=async(req,res,next)=>{
        try{
            const friendid = req.params.friendid;
            const userid = req.userid;
            const message = await repository.toggleFriendship(userid,friendid);
            if(message){
                res.status(200).json({success:true,msg:message});
            }else{
                res.status(404).json({success:true,msg:"user not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while sending/deleting requests!");
        }
    }

    response=async(req,res,next)=>{
        try{
            const response = req.params.response;
            const friendid = req.params.friendid;
            const userid = req.userid;
            const resp = await repository.response(userid,friendid,response);
            if(resp){
                res.status(200).json({success:true,msg:resp});
            }else{
                res.status(404).json({success:false,msg:"friend not found!"});
            }
        }catch(err){
            console.log(err);
            res.status(400,"something went wrong while responding to request!");
        }
    }
}