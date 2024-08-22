import mongoose from "mongoose";
import likeSchema from "./like.schema.js";
import commentSchema from "../comment/comment.schema.js";
import postSchema from "../post/post.schema.js";

const likeModel = mongoose.model("Like",likeSchema);
const commentModel = mongoose.model("Comment",commentSchema);
const postModel = mongoose.model("Post",postSchema);

export default class LikeRepository{
    getLikes=async(targetid)=>{
        const likes = await likeModel.find({targetid:targetid});
        if(likes){
            return likes;
        }else{
            return false;
        }
    }

    toggleLikes=async(targetid,userid,type)=>{
        let buffer;
        const post = await postModel.findById(targetid);
        const comment = await commentModel.findById(targetid);
        if((post || comment) && (type=="Post" || type=="Comment")){
            const like = await likeModel.findOne({targetid:targetid,userid:userid});
            if(like){
                buffer = await likeModel.findOneAndDelete({userid:userid,targetid:targetid});
                if(type=="Post"){
                    const index = post.likes.findIndex(likeid=>likeid==targetid);
                    buffer = post.likes.splice(index,1);
                    await post.save();
                }else{
                    const index = comment.likes.findIndex(likeid=>likeid==targetid);
                    buffer = comment.likes.splice(index,1);
                    await comment.save();
                }
                return "disliked!";
            }else{
                buffer = await new likeModel({userid:userid,targetid:targetid,target:type});
                await buffer.save();
                if(type=="Post"){
                    post.likes.push(buffer._id);
                    await post.save();
                }else{
                    comment.likes.push(buffer._id);
                    await comment.save();
                }
                return "liked!";
            } 
        }else{
            return false;
        }
    }
}