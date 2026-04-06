import express from "express";
import {
  summary,
  categoryTotals,
  monthlyTrends,
  recent
} from "./dashboard.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import authorizeRoles from "../../middleware/role.middleware.js";
import { apiLimiter } from "../../middleware/rateLimit.middleware.js";

const router = express.Router();

// Viewer + Analyst + Admin
router.get("/summary", apiLimiter, authMiddleware, authorizeRoles("viewer", "analyst", "admin"), summary);

router.get("/categories", apiLimiter, authMiddleware, authorizeRoles("analyst", "admin"), categoryTotals);

router.get("/trends", apiLimiter, authMiddleware, authorizeRoles("analyst", "admin"), monthlyTrends);

router.get("/recent", apiLimiter, authMiddleware, authorizeRoles("analyst", "admin"), recent);

export default router;