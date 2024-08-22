import mongoose from "mongoose";
import nodemailer from "nodemailer";
import  bcrypt from "bcrypt";
import userSchema from "../user/user.schema.js";

const userModel = mongoose.model("User",userSchema);

export default class OTPRepository{
    sendOTP = async(email)=>{
        const verification = await userModel.findOne({email:email});
        if(verification){
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"codingninjas2k16@gmail.com",
                    pass:"slwvvlczduktvhdj",
                }
            });
            
            const OTP = Math.floor(100000 + Math.random() * 900000);
    
            const mailOptions = {
                from:"ripperop9691@gmail.com",
                to:`${email}`,
                subject:"OTP for reseting password",
                text:`${OTP}`
            }
    
            await transporter.sendMail(mailOptions);
            return OTP;
        }else{
            return false;
        }
    }

    verifyOTP = async(email)=>{
        const verification = await userModel.findOne({email:email});
        if(verification){
            return true;
        }else{
            return false;
        }
    }

    resetPassword = async(email,new_password)=>{
        let buffer = await userModel.findOne({email:email});
        if(buffer){
            const hashedPassword = await bcrypt.hash(new_password,12);
            buffer = await userModel.findOneAndUpdate({email:email},{password:hashedPassword},{new:true});
            await buffer.save();
            return true;
        }else{
            return false;
        }
    }
}