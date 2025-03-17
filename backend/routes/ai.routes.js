import {Router} from "express"
import * as aicontroller from "../controller/ai.controller.js"
const router=Router();
router.get("/getresult",aicontroller.getresult);
export default router;