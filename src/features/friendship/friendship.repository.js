import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import friendshipSchema from "./friendship.schema.js"; 
import userSchema from "../user/user.schema.js";

const friendshipModel = mongoose.model("Friendship",friendshipSchema);
const userModel = mongoose.model("User",userSchema);

export default class FriendshipRepository{
    getFriends=async(userid)=>{
        const user = await userModel.findById(userid).populate("friends").select("-password").select("-tokens");
        if(user){
            if(user.friends.length > 0){
                return user.friends;
            }else{
                return "no friends yet!";
            }
        }else{
            return false;
        }
    }

    getRequests=async(userid)=>{
        const user = await friendshipModel.findOne({userid:userid});
        if(user.requests.length > 0){
            return user.requests;
        }else{
            return false;
        }
    }

    toggleFriendship=async(myid,friendid)=>{
        //checking if the friend is valid or not
        let friend = await userModel.findById(friendid);
        if(friend){
            if(myid==friendid){
                return "you cannot send request to yourself!";
            }
            //checking if the person i am sending request has already requested to me!
            const userF =  await friendshipModel.findOne({userid:myid});
            let result = userF.requests.find(id=>id==friendid);
            if(result){
                return "the person you are trying to send request has already sent you friend request, please respond!";
            }
            //checking if the user is already in the friendlist or not?
            result = friend.friends.find(id=>id==myid);
            if(result){
                //if user is already a friend then unfriend him/her
                //unfriending from friend side
                let index = friend.friends.findIndex(id=>id==myid);
                let buffer = friend.friends.splice(index,1);
                await friend.save();
                //unfriending from user side
                const userU = await userModel.findById(myid);
                index = userU.friends.findIndex(id=>id==friendid);
                buffer = userU.friends.splice(index,1);
                await userU.save();
                return "user is removed from friend list!";
            }
            //retrieving friend from friendship model
            friend = await friendshipModel.findOne({userid:friendid});
            //checking if i have already sent a friend request
            result = friend.requests.find(id=>id==myid);
            if(result){
                //if sent then withdraw request
                const index = friend.requests.findIndex(id=>id==myid);
                const buffer = friend.requests.splice(index,1);
                await friend.save();
                return "friend request has been cancelled!";
            }else{
                //if not sent then send friend request
                friend.requests.push(myid);
                await friend.save();
                return "friend request sent!";
            }
        }else{
            //return if not a valid friend
            return false;
        }
    }

    response=async(userid,friendid,response)=>{
        const friend = await userModel.findById(friendid);
        if(friend){
            const userF = await friendshipModel.findOne({userid:userid});
            const result = userF.requests.find(id=>id==friendid);
            console.log(result);
            if(result){
                if(response == "accept"){
                    const index = userF.requests.findIndex(id=>id==friendid);
                    const buffer = userF.requests.splice(index,1);
                    await userF.save();
                    const userU = await userModel.findById(userid);
                    await userU.friends.push(friendid);
                    await userU.save();
                    friend.friends.push(userU);
                    await friend.save();
                    return "request accepted!";
                }else if(response == "reject"){
                    const index = userF.requests.findIndex(id=>id==friendid);
                    const buffer = userF.requests.splice(index,1);
                    await userF.save();
                    return "request rejected!";
                }
            }else{
                return "there is no friend such request you are responding to!";
            }
        }else{
            return false;
        }
    }
}