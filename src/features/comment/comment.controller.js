import CommentRepository from "./comment.repository.js";
import customError from "../../middleware/errorHandler.middleware.js";

const repository = new CommentRepository();

export default class CommentController{
    getComments=async(req,res,next)=>{
        try{
            const postid = req.params.postid;
            const comments = await repository.getComments(postid);
            if(comments){
                res.status(200).json({success:true,msg:comments});
            }else{
                res.status(404).json({success:false,msg:"no comments!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while retrieving comments!");
        }
    }

    postComment=async(req,res,next)=>{
        try{
            const postid = req.params.postid;
            const userid = req.userid;
            const {content} = req.body;
            const comment = await repository.postComment(postid,userid,content);
            res.status(201).json({success:true,msg:comment});
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while posting a comment!");
        }
    }

    updateComment=async(req,res,next)=>{
        try{
            const commentid = req.params.commentid; 
            const userid = req.userid;
            const {content} = req.body;
            const comment = await repository.updateComment(userid,commentid,content);
            if(comment){
                res.status(200).json({success:true,msg:comment});
            }else{
                res.status(404).json({success:false,msg:"comment not found!"})
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while updating a comment!");
        }
    }

    deleteComment=async(req,res,next)=>{
        try{
            const commentid = req.params.commentid;
            const userid = req.userid;
            const comment = await repository.deleteComment(userid,commentid);
            if(comment){
                res.status(200).json({success:true,msg:comment});
            }else{
                res.status(404).json({success:false,msg:"comment not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while deleting the comment!");
        }
    }
}