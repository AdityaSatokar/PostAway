import mongoose from "mongoose";
import postSchema from "./post.schema.js";
import userSchema from "../user/user.schema.js";

const postModel = mongoose.model("Post",postSchema);
const userModel = mongoose.model("User",userSchema);

export default class PostRepository{
    postUpload=async(userid,imgUrl,caption)=>{
        const post = await new postModel({userid:userid,image:imgUrl,caption:caption});
        await post.save();
        const user = await userModel.findById(userid);
        user.posts.push(post._id);
        await user.save();
        return post;
    }

    getAll=async()=>{
        const posts = await postModel.find().populate('likes comments');
        if(posts){
            return posts;
        }else{
            return false;
        }
    }

    getPostById=async(id)=>{
        const post = await postModel.findById(id).populate('likes comments');
        if(post){
            return post;
        }else{
            return false;
        }
    }

    getUserPosts=async(userid)=>{
        const posts = await postModel.find({userid:userid}).populate('likes comments');
        if(posts){
            return posts;
        }else{
            return false;
        }
    }

    deletePost=async(userid,postid)=>{
        let post = await postModel.findById(postid);
        console.log(post);
        if(post){
            if(post.userid==userid){
                post = await postModel.findByIdAndDelete(postid);
                return post;
            }else{
                return "you cannot delete someone else's post!";
            }
        }else{
            return false;
        }
    }

    updatePost = async (userid, postid, imgUrl, caption) => {
        let post = await postModel.findById(postid);
        if(post){
            if(post.userid==userid){
                const updatedPost = await postModel.findOneAndUpdate({ postid },{ image: imgUrl, caption: caption } ,{ new: true });
                return updatedPost;
            }else{
                return "you cannot update someone else's post!";
            }
        }else{
            return false;
        }
    }
}