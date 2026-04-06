import express from "express";
import { login, register } from "./auth.controller.js";
import { authLimiter } from "../../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/register",authLimiter, register);
router.post("/login",authLimiter, login);

export default router;