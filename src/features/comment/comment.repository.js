import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";
import postSchema from "../post/post.schema.js";

const commentModel = mongoose.model("Comment",commentSchema);
const postModel = mongoose.model("Post",postSchema);

export default class CommentRepository{
    getComments=async(postid)=>{
        const comments = await commentModel.find({postid:postid});
        if(comments){
            return comments;
        }else{
            return false;
        }
    }

    postComment=async(postid,userid,content)=>{
        const comment = await commentModel({postid:postid,userid:userid,content:content});
        await comment.save();
        const post = await postModel.findById(postid);
        post.comments.push(comment._id);
        await post.save();
        return comment;
    }

    updateComment=async(userid,commentid,content)=>{
        const comment = await commentModel.findById(commentid);
        if(comment){
            if(comment.userid == userid){
                const updatedComment = await commentModel.findByIdAndUpdate(commentid,{content:content},{new:true});
                return updatedComment;
            }else{
                return "you cannot update someone else's comment!";
            }
        }else{
            return false;
        }
    }

    deleteComment=async(userid,commentid)=>{
        let comment = await commentModel.findById(commentid);
        if(comment){
            if(comment.userid == userid){
                const post = await postModel.findById(comment.postid);
                const index = post.comments.findIndex(comment=>comment==commentid);
                const buffer = post.comments.splice(index,1);
                await post.save();
                comment = await commentModel.findByIdAndDelete(commentid);
                return comment;
            }else{
                return "you cannot delete someone else's comment";
            }
        }else{
            return false;
        }
    }
}