import projectModel from '../models/project.model.js';
import * as projectService from '../Services/project.service.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
export const createProject = async (req, res) => {
   const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }
   try{
   const {name}=req.body;
   const {email}=req.user;
   console.log(email);
   const loggedInUser=await userModel.findOne({email:email});
   const project=await projectService.createProject(name,loggedInUser._id);
   return res.status(201).json(project);
   }
   catch(err){
    console.log(err);
       return res.status(400).json({error:err.message});
   }
};
export const getAllProjects = async (req, res) => {
    try{
       console.log(req.user.email);
       if(!req.user.email)
       {
        return res.status(401).json({error:"Unauthorized"});
       }
       const loggedInuser=await userModel.findOne({email:req.user.email});

       const projects=await projectService.getAllProjects(loggedInuser._id);
       return res.status(200).json({projects:projects});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err.message});
    }
}
export const addUser = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(projectId);
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {projectId,users}=req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const project=await projectService.addUser({projectId,users, userId: loggedInUser._id });
        return res.status(200).json(project);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err.message});
    }
}
export const getProject = async (req, res) => {
    try{
        const { projectId } = req.params;
        const project=await projectService.getProject({projectId});
        console.log(project);
        return res.status(200).json({project});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err.message});
    }
}