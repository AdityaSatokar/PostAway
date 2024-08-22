import customError from "../../middleware/errorHandler.middleware.js";
import PostRepository from "./post.repository.js";

const repository = new PostRepository();

export default class PostController{
    getAll=async(req,res,next)=>{
        try{
            const posts = await repository.getAll();
            if(posts){
                res.status(200).json({success:true,msg:posts});
            }else{
                res.status(404).json({success:false,msg:"posts not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while loading posts!");
        }
    }

    getPostById=async(req,res,next)=>{
        try{
            const postid = req.params.postid;
            const post = await repository.getPostById(postid);
            if(post){
                res.status(200).json({success:true,msg:post});
            }else{
                res.status(404).json({success:false,msg:"post not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while finding a post!");
        }
    }

    getUserPosts=async(req,res,next)=>{
        try{
            const userid = req.userid;
            const posts = await repository.getUserPosts(userid);
            if(posts.length > 0){
                res.status(200).json({success:true,msg:posts})
            }else{
                res.status(404).json({success:false,msg:"you have not posted anything yet!"})
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while loading your posts!");
        }
    }

    postUpload=async(req,res,next)=>{
        try{
            const userid = req.userid;
            const {caption} = req.body;
            const imgUrl = "src/storage/"+req.file.filename;
            const newPost = await repository.postUpload(userid,imgUrl,caption);
            res.status(201).json({success:true,msg:newPost});
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while creating a new post!");
        }
    }

    deletePost=async(req,res,next)=>{
        try{
            const postid = req.params.postid;
            const userid = req.userid;
            const deletedPost = await repository.deletePost(userid,postid);
            if(deletedPost){
                res.status(200).json({success:true,msg:deletedPost});
            }else{
                res.status(404).json({success:false,msg:"post not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"somthing went wrong while deleting post!");
        }
    }

    updatePost=async(req,res,next)=>{
        try{
            const postid = req.params.postid;
            const userid = req.userid;
            const {caption} = req.body;
            const imgUrl = "src/storage/"+req.file.filename;
            const updatedPost = await repository.updatePost(userid,postid,imgUrl,caption);
            if(updatedPost){
                res.status(200).json({success:true,msg:updatedPost});
            }else{
                res.status(404).json({success:false,msg:"post not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while updating the post!");
        }
    }
}