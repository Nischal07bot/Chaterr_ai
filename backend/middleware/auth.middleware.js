import jwt from "jsonwebtoken";
import redisClient from "../Services/redis.service.js";

export const authmiddleware=async(req,res,next)=>{
    try{

        const token=req.cookies.token || req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized"});
        }
        const isBlacklisted=await redisClient.get(token);
        console.log(isBlacklisted);
        if(isBlacklisted)
        {
            res.cookie("token","",);
            return res.status(401).json({error:"User is logged out"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
