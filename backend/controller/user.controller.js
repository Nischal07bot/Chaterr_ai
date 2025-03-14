import usermodel from "../models/user.model.js";
import * as userService from "../Services/user.service.js";
import { validationResult } from "express-validator";
import * as auth from "../middleware/auth.middleware.js";
import redisClient from "../Services/redis.service.js";
export const createUsercontroller=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user=await userService.createUser(req.body);
        const token=await user.generatetoken();
        delete user._doc.password;
        res.status(201).json({user,token});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
export const logincontroller=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,password}=req.body;
        const user=await usermodel.findOne({email:email}).select("+password");//This is important for your login controller because:
        //You need the password hash to compare with the provided password
        //The select option is used to include the password field in the query result
        if(!user)
        {
            return res.status(401).json({error:"Credentials are incorrect"});
        }
        const isvalid=await user.comparePassword(password);
        if(!isvalid)
        {
            return res.status(401).json({error:"Credentials are incorrect"});

        }
        const token=await user.generatetoken();
        delete user._doc.password;
        res.status(200).json({user,token});
                
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
        
}

export const getuserprofile=async(req,res)=>{
           console.log(req.user);
           res.status(200).json({message:"Profile fetched successfully",user:req.user});
}
export const logoutcontroller=async(req,res)=>{
    try{
        const token=req.cookies.token || req.headers.authorization.split(" ")[1];
        redisClient.set(token,'logout','EX',60*60*24);
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err.message});
    }
}
export const getdashboard = async (req, res) => {
    try {
        console.log(req.user);
        const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized, token missing" });
        }

        res.status(200).json({ user: req.user, token: token });
    } catch (err) {
        console.error("Error in getdashboard:", err);
        res.status(500).json({ error: err.message });
    }
};
