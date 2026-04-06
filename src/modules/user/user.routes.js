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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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
 *                   name: "Hemanth Kumar"
 *                   email: "hemanth@example.com"
 *                   role: "admin"
 *                   isActive: true
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
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
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
 *               role:
 *                 type: string
 *                 example: analyst
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "661234abcd1234abcd1234ab"
 *                 name: "Hemanth Kumar"
 *                 email: "hemanth@example.com"
 *                 role: "analyst"
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid role"
 */



/**
 * @swagger
 * /api/users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags: [Users]
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
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "661234abcd1234abcd1234ab"
 *                 name: "Hemanth Kumar"
 *                 email: "hemanth@example.com"
 *                 role: "admin"
 *                 isActive: false
 *       500:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "User not found"
 */


