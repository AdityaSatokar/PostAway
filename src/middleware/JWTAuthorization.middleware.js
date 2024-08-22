import jwt from "jsonwebtoken";
import userSchema from "../features/user/user.schema.js";
import customError from "./errorHandler.middleware.js";
import mongoose from "mongoose";

const userModel = mongoose.model("User",userSchema);

const jwtAuthentication = async(req,res,next)=>{
    try{
        console.log(req.cookies);
        const {jwtToken} = req.cookies;
        const payload = jwt.verify(jwtToken,"ZlnbZ7tdhfLEm32seq26l91QNrabkoXk");
        req.userid = payload.userid;
        const user = await userModel.findById(payload.userid);
        if(user){
            const resp = user.tokens.find(token=>token==jwtToken);
            if(resp){
                next();
            }else{
                res.status(400).send("please login!");
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).send("please login!");
    }
}
export default jwtAuthentication; 