import usermodel from "../models/user.model.js";



export const createUser=async ({
    email,password
})=>{
    if(!email || !password)
    {
        throw new Error("Email and password are required");
    }
    const hashedpassword=await usermodel.hashPassword(password);
    const user=await usermodel.create({email:email,password:hashedpassword});
    return user;
}

