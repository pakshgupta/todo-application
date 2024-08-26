import { Router } from "express";
import { validateJWT } from "../middlewares/validateJwt.js"
import { createTaskController, deleteTaskController, searchTaskController, showTaskController, updatePriorityController, updateStatusController } from "../controllers/task.controller.js";
const router=Router();
router.route("/create").post(validateJWT, createTaskController);
router.route("/display").get(validateJWT,showTaskController);
router.route("/search-task").get(validateJWT,searchTaskController);
router.route("/update-status/:id").patch(validateJWT,updateStatusController);
router.route("/update-priority/:id").patch(validateJWT,updatePriorityController);
router.route("/:id").delete(validateJWT,deleteTaskController);


export default router;