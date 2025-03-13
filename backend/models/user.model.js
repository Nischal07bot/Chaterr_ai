import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is requied"],
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[6,'Email must be at least 6 characters long']
    },
    password:{
        type:String,
        select:false,
    }
})
userSchema.statics.hashPassword=async function(password){
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generatetoken=function(){
    return jwt.sign({email:this.email},process.env.JWT_SECRET,{expiresIn:"24h"});

}
const User=mongoose.model("user",userSchema);
export default User;
//i am following mvc model where the buisness end of the code is in the user.mode.js file 
