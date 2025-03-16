import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
const port=process.env.PORT || 3000//or operator used as a fallback option
const server=http.createServer(app);//creating server her since it can work with both http and websockets since it 
//uses the tcp persistent connection which app.listen() does not handle 
const io = new Server(server,{cors:{origin:"*"}});


io.use((socket,next)=>{
    try{
        const token=socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
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
    console.log('a user connected');//jb ek user connect hota hai server se to ye message print hota hai
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
