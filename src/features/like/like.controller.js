import customError from "../../middleware/errorHandler.middleware.js";
import LikeRepository from "./like.repository.js"

const repository = new LikeRepository();

export default class LikeController{
    getLikes=async(req,res,next)=>{
        try{
            const targetid = req.params.id;
            const likes = await repository.getLikes(targetid);
            if(likes){
                res.status(200).json({success:true,msg:likes});
            }else{
                res.status(404).json({success:false,msg:"no likes!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while getting likes!");
        }
    }

    toggleLikes=async(req,res,next)=>{
        try{
            const targetid = req.params.id;
            const userid = req.userid;
            const type = req.query.type;
            const resp = await repository.toggleLikes(targetid,userid,type);
            if(resp){
                res.status(200).json({success:true,msg:resp});
            }else{
                res.status(404).json({success:true,msg:"incorrect ID or Type!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wong while liking!");
        }
    }
}