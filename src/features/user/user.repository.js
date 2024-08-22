import mongoose from "mongoose"
import bcrypt from "bcrypt";
import userSchema from "./user.schema.js"
import friendshipSchema from "../friendship/friendship.schema.js";

const userModel = mongoose.model("User",userSchema);
const friendshipModel = mongoose.model("Friendship",friendshipSchema);

export default class UserRepository{
    signup=async(name,email,password,gender)=>{
        const user = await new userModel({name:name,email:email,password:password,gender:gender});
        await user.save();
        const buffer = await new friendshipModel({userid:user._id});
        await buffer.save();
        return user;
    }
    
    signin=async(email,password)=>{
        const user = await userModel.findOne({email:email});
        if(user){
            const result = await bcrypt.compare(password,user.password);
            if(result){
                return user;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    logout=async(userid,jwtToken)=>{
        const user = await userModel.findById(userid);
        if(user){
            const index = user.tokens.findIndex(token=>token==jwtToken);
            const token = user.tokens.splice(index,1);
            await user.save();
            return token;
        }else{
            return false;
        }
    }

    logoutAll=async(userid)=>{
        const user = await userModel.findById(userid);
        if(user){
            user.tokens = [];
            await user.save();
            return true;
        }else{
            return false;
        }
    }
    
    getDetails=async(id)=>{
        const user = await userModel.findById(id).populate("posts friends").select("-password").select("-tokens");
        if(user){
            return user;
        }else{
            return false;
        }
    }

    getAllDetails=async()=>{
        const users = await userModel.find().populate("posts friends").select("-password").select("-tokens");
        if(users){
            return users;
        }else{
            return false;
        }
    }

    updateDetails=async(id,name,email,gender)=>{
        const user = await userModel.findById(id).select("-password").select("-tokens");
        if(user){
            if(name){
                user.name = name;
            }
            if(email){
                user.email = email;
            }
            if(gender){
                user.gender = gender;
            }
            
            await user.save();
            return user;
        }else{
            return false;
        }
    }
}