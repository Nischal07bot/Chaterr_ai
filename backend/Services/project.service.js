import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async (name, userId) => {
      if(!name)
      {
            throw new Error("Name is required");
      }
      if(!userId)
      {
            throw new Error("User is required");
      }
      let project;
      try{
           project = await projectModel.create({name,users:[userId]});
      }
      catch(err){
            if(err.code===11000)
            {
                  throw new Error("Project name already exists");
            }
           throw err;
      }
      return project;
      
}
export const getAllProjects = async (userId) => {
      if(!userId)
      {
        throw new Error("User is required");
      }
      const projects = await projectModel.find({users:userId});
      return projects;
}
export const addUser= async ({ projectId, users, userId }) => {

      if (!projectId) {
          throw new Error("projectId is required")
      }
  
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
          throw new Error("Invalid projectId")
      }
  
      if (!users) {
          throw new Error("users are required")
      }
  
      if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
          throw new Error("Invalid userId(s) in users array")
      }
  
      if (!userId) {
          throw new Error("userId is required")
      }
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid userId")
      }
  console.log(projectId)
  
      const project = await projectModel.findOne({
          _id: projectId,
          users: userId
      })
  
      console.log(userId);
  
      if (!project) {
          throw new Error("User not belong to this project")
      }
  
      const updatedProject = await projectModel.findOneAndUpdate({
          _id: projectId
      }, {
          $addToSet: {
              users: {
                  $each: users
              }
          }
      }, {
          new: true//jo naya document use update

      })
  
      return updatedProject
  
  
  
  }
  

export const getProject = async ({ projectId }) => {
      if(!projectId)
      {
            throw new Error("Project ID is required");
      }
      if(!mongoose.Types.ObjectId.isValid(projectId))
      {
            throw new Error("Invalid Project ID");
      }
      const project=await projectModel.findById({_id: projectId}).populate('users');
      if(!project)
      {
            throw new Error("Project not found");
      }
      return project;
}