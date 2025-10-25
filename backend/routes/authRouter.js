import express from "express";
import { signup, login } from "../controller/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
