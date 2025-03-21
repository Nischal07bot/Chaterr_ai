import {Router} from "express";
import * as userController from "../controller/user.controller.js";
import {body} from "express-validator";
import * as auth from "../middleware/auth.middleware.js";
const router=Router();
router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],userController.createUsercontroller);
router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],userController.logincontroller);
router.get("/profile",auth.authmiddleware,userController.getuserprofile);
router.get("/logout",auth.authmiddleware,userController.logoutcontroller);
router.get("/dashboard",auth.authmiddleware,userController.getdashboard);
router.get("/all",auth.authmiddleware,userController.getallusers);
export default router
