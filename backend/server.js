import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
const port=process.env.PORT || 3000//or operator used as a fallback option
const server=http.createServer(app);//creating server her since it can work with both http and websockets since it 
//uses the tcp persistent connection which app.listen() does not handle 

server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
