import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterinput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per windowMs
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, validateRegisterinput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
