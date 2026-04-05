import express from "express";
import {
  summary,
  categoryTotals,
  monthlyTrends,
  recent
} from "./dashboard.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import authorizeRoles from "../../middleware/role.middleware.js";

const router = express.Router();

// Viewer + Analyst + Admin
router.get("/summary", authMiddleware, authorizeRoles("viewer", "analyst", "admin"), summary);

router.get("/categories", authMiddleware, authorizeRoles("analyst", "admin"), categoryTotals);

router.get("/trends", authMiddleware, authorizeRoles("analyst", "admin"), monthlyTrends);

router.get("/recent", authMiddleware, authorizeRoles("analyst", "admin"), recent);

export default router;