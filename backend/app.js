import dotenv from "dotenv";
dotenv.config();//to use some global variables
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from './db/db.js';
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import redisClient from "./Services/redis.service.js";
import projectRoutes from "./routes/projects.routes.js";
import airoutes from "./routes/ai.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// Serve static files from the React build folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();


connect();
app.use(express.json());//parsing json bodies in the request
app.use(express.urlencoded({extended:true}));//allows to parse urlencoded bodies
app.use(cors());//allows to make requests from different origins
//  For example, if your frontend is on localhost:3000 and backend on localhost:5000,
//  CORS allows them to communicate
//abovee are some of the middlewares i have used
app.use(morgan("dev"));//logging middleware
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/projects",projectRoutes);
app.use("/ai",airoutes)


app.use(express.static(path.join(__dirname, "dist")));

// Handle React routing, return index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;




