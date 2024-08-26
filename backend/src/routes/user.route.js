import { Router } from "express";
import { loginController, logoutController, registerController } from "../controllers/user.controller.js";
const router=Router();
router.route("/signup").post(registerController);
router.route("/signin").post(loginController);
router.route("/logout").get(logoutController);

export default router;