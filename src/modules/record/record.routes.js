import express from "express";
import {
  create,
  getAll,
  update,
  remove
} from "./record.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import authorizeRoles from "../../middleware/role.middleware.js";
import { apiLimiter } from "../../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/create",apiLimiter, authMiddleware, authorizeRoles("admin"), create);

router.get("/", apiLimiter, authMiddleware, authorizeRoles("analyst", "admin"), getAll);

router.patch("/:id", apiLimiter, authMiddleware, authorizeRoles("admin"), update);

router.delete("/:id", apiLimiter, authMiddleware, authorizeRoles("admin"), remove);

export default router;


/**
 * @swagger
 * /api/records/create:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: food
 *               date:
 *                 type: string
 *                 example: 2025-04-01
 *               notes:
 *                 type: string
 *                 example: Dinner
 *     responses:
 *       201:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "661234abcd1234abcd1234ab"
 *                 amount: 5000
 *                 type: "expense"
 *                 category: "food"
 *                 date: "2025-04-01T00:00:00.000Z"
 *                 notes: "Dinner"
 *       400:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "invalid amount"
 */


/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records with filtering and pagination
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: food
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         example: 2025-04-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         example: 2025-04-10
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 5
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               total: 10
 *               page: 1
 *               totalPages: 2
 *               data:
 *                 - _id: "661234abcd1234abcd1234ab"
 *                   amount: 5000
 *                   type: "expense"
 *                   category: "food"
 *                   date: "2025-04-01T00:00:00.000Z"
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
 * /api/records/{id}:
 *   patch:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 661234abcd1234abcd1234ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 6000
 *               notes:
 *                 type: string
 *                 example: Updated note
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "661234abcd1234abcd1234ab"
 *                 amount: 6000
 *                 notes: "Updated note"
 *       404:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Record not found"
 */


/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record (soft delete)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 661234abcd1234abcd1234ab
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Record deleted"
 *       404:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Record not found"
 */