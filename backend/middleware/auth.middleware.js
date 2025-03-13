import jwt from "jsonwebtoken";
export const authmiddleware=async(req,res,next)=>{
    try{
        console.log( req.headers.authorization.split(" ")[1])
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No authorization header" });
        }

        const token=req.cookies.token || req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
