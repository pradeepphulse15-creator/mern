import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterinput, validateLoginInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterinput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
