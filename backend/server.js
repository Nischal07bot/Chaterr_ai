import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from    "mongoose";
import projectModel from "./models/project.model.js";
import { generateResult } from "./Services/gemini.service.js";
const port=process.env.PORT || 3000//or operator used as a fallback option
const server=http.createServer(app);//creating server her since it can work with both http and websockets since it 
//uses the tcp persistent connection which app.listen() does not handle 
const io = new Server(server,{cors:{origin:"*"}});


io.use(async (socket,next)=>{
    try{
        const token=socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
        const projectId=socket.handshake.query.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error("Invalid ProjectId"));
        }
        socket.project=await projectModel.findById(projectId);
        if(!token){
           return next(new Error("Token not found"));
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
       if(!decoded){
           return next(new Error("Invalid token"));
       }
       socket.user=decoded;
       next();
    }catch(error){
        next(error);
    }
})

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString()
    console.log('a user connected');
    socket.join(socket.roomId);
    socket.on('project-message', async (data) => {
        console.log(data)
        const message=data.message;
        const aiIspresent=message.includes("@ai");
        if(aiIspresent)
        {
           const prompt=message.replace("@ai","");
           const result=await generateResult(prompt);
           io.to(socket.roomId).emit("project-message",{
            message:result,
            sender:{
                _id:"ai",
                email:"AI"
            }
           })
        }
        socket.broadcast.to(socket.roomId).emit('project-message', data)
    })
    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.roomId);
    });
});

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
