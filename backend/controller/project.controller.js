import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
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