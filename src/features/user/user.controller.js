import  bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import customError from "../../middleware/errorHandler.middleware.js";

const repository = new UserRepository;

export default class UserController{
    signup=async(req,res,next)=>{
        try{
            const {name,email,password,gender} = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            const user = await repository.signup(name,email,hashedPassword,gender);
            res.status(201).json({success:true,msg:user});
        }catch(err){
            console.log(err);
            throw new customError(400,"Something went wrong while signing up!")
        }
    }
    
    signin=async(req,res,next)=>{
        try{
            const {email,password} = req.body;
            const user = await repository.signin(email,password);
            if(user){
                const token = jwt.sign({userid:user.id},"ZlnbZ7tdhfLEm32seq26l91QNrabkoXk",{expiresIn:"1h"});
                await user.tokens.push(token);
                await user.save();
                res.status(200).cookie("jwtToken",token,{maxAge:1*60*60*1000,httpOnly:false}).json({success:true,msg:"login successfull!",token});
            }else{
                res.status(404).json({success:false,msg:"wrong email or password"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"Something went wrong while signing in!");
        }
    }
    
    logout=async(req,res,next)=>{
        try{
            const userid = req.userid;
            console.log(userid);
            const {jwtToken} = req.cookies;
            const token = await repository.logout(userid,jwtToken);
            if(token){
                req.session.destroy();
                res.clearCookie("jwtToken");
                res.status(200).json({success:true,msg:"logged out successfully!"});
            }else{
                res.status(400).json({success:false,msg:"user not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"somthing went wrong while logging out!");
        }
    }
    
    logoutAll=async(req,res,next)=>{
        try{
            const userid = req.userid;
            const {jwtToken} = req.cookies;
            const resp = await repository.logoutAll(userid,jwtToken);
            if(resp){
                req.session.destroy();
                res.clearCookie("jwtToken");
                res.status(200).json({success:true,msg:"logged out of all devices successfully!"});
            }else{
                res.status(400).json({success:false,msg:"user not found!"});
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"somthing went wrong while logging out from all devices!");
        }
    }
    
    getDetails=async(req,res,next)=>{
        try{
            const id = req.params.userid;
            const user = await repository.getDetails(id);
            if(user){
                res.status(200).json({success:true,msg:user});
            }else{
                res.status(404).json({success:false,msg:"user not found!"})
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while getting user details!");
        }
    }

    getAllDetails=async(req,res,next)=>{
        try{
            const users = await repository.getAllDetails();
            res.status(200).json({success:true,msg:users});
        }catch(err){
            console.log(err);
            throw new customError(400,"something went wrong while getting all the user's details!");
        }
    }

    updateDetails=async(req,res,next)=>{
        try{
            const id = req.params.userid;
            const {name,email,gender} = req.body;
            const user = await repository.updateDetails(id,name,email,gender);
            if(user){
                res.status(201).json({success:true,msg:user});
            }else{
                res.status(404).json({success:false,msg:"user not found!"})
            }
        }catch(err){
            console.log(err);
            throw new customError(400,"error while updateing the user details!");
        }
    }
}