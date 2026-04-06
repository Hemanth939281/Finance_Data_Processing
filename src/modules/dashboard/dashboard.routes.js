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

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalIncome: 50000
 *                 totalExpense: 20000
 *                 netBalance: 30000
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "error message"
 */

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Get category wise totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - category: "food"
 *                   total: 5000
 *                 - category: "transport"
 *                   total: 2000
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "error message"
 */

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id:
 *                     year: 2025
 *                     month: 4
 *                     type: "income"
 *                   total: 10000
 *                 - _id:
 *                     year: 2025
 *                     month: 4
 *                     type: "expense"
 *                   total: 5000
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "error message"
 */


/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent records
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "661234abcd1234abcd1234ab"
 *                   amount: 5000
 *                   type: "expense"
 *                   category: "food"
 *                   date: "2025-04-01T00:00:00.000Z"
 *                   createdBy:
 *                     name: "Hemanth Kumar"
 *                     email: "hemanth@example.com"
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "error message"
 */