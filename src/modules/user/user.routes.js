import { getUsers, updateRole, updateStatus } from "./user.controller.js";
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js"
import { apiLimiter } from "../../middleware/rateLimit.middleware.js";

const router = express.Router();

// Admin only routes

router.get("/", apiLimiter, authMiddleware, roleMiddleware("admin"), getUsers);
router.patch("/:id/role", apiLimiter ,authMiddleware, roleMiddleware("admin"), updateRole);
router.patch("/:id/status", apiLimiter, authMiddleware, roleMiddleware("admin"), updateStatus);

export default router;