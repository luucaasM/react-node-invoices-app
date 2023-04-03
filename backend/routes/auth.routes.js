import { Router } from "express";
import { handleLogin } from "../controllers/login.controller.js";
import { handleRegister } from "../controllers/register.controller.js";
const router = Router();

router.get("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
