import customError from "../../middleware/errorHandler.middleware.js"
import OTPRepository from "./otp.repository.js";

const repository = new OTPRepository();

export default class OTPController{
    sendOTP = async(req,res,next)=>{
        try{
            const {email} = req.body;
            const OTP = await repository.sendOTP(email);
            if(OTP){
                res.status(200).cookie("OTP",OTP,{maxAge:5*60*1000}).json({success:true,msg:`Success:Email sent to ${email}`});
            }else{
                res.status(200).json({success:true,msg:`there is no such user associated to ${email}`});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while sending an OTP!");
        }
    }

    verifyOTP = async(req,res,next)=>{
        const cookieOTP = req.cookies.OTP;
        const bodyOTP = req.body.otp;
        const email = req.body.email;
        try{
            if(cookieOTP){
                if(bodyOTP){
                    const resp = await repository.verifyOTP(email);
                    if(resp){
                        if(cookieOTP == bodyOTP){
                            res.clearCookie("OTP");
                            res.status(200).cookie("userEmail",email,{maxAge:5*60*1000}).json({success:true,msg:"OTP verified!"}); 
                        }else{
                            res.status(200).json({success:false,msg:"incorrect OTP!"});
                        }
                    }else{
                        res.status(200).json({success:true,msg:`no such user is associated to ${email}!`});
                    }
                }else{
                    res.status(404).json({success:false,msg:"please provide an OTP!"});
                }
            }else{
                res.status(404).json({success:false,msg:"OTP expired!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while verifying OTP");
        }
    }

    resetPassword = async(req,res,next)=>{
        try{
            const email = req.cookies.userEmail;
            if(email){
                const {new_password} = req.body;
                const resp = await repository.resetPassword(email,new_password);
                if(resp){
                    res.clearCookie("userEmail");
                    res.status(200).json({success:true,msg:"password changed successfully!"});
                }else{
                    res.status(404).json({success:true,msg:`no such user associated with ${email}!`});
                }
            }else{
                res.status(404).json({success:false,msg:"OTP verification expired!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while reseting password!");
        }
    }
}