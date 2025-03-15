import {Router } from 'express';
import {body} from 'express-validator';
import * as projectController from '../controller/project.controller.js';
import * as auth from '../middleware/auth.middleware.js';
const router=Router();
router.post("/create",auth.authmiddleware,body('name').isString().withMessage("Name is required"),projectController.createProject);
router.get("/all",auth.authmiddleware,projectController.getAllProjects);
router.put("/adduser",auth.authmiddleware,body('projectId').isString().withMessage('Project ID is required'),
body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
    .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),projectController.addUser);
router.get("/getproject/:projectId",auth.authmiddleware,projectController.getProject);
export default router;