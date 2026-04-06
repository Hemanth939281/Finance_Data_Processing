import express from "express";
import { login, register } from "./auth.controller.js";
import { authLimiter } from "../../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/register",authLimiter, register);
router.post("/login",authLimiter, login);

export default router;

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hemanth Kumar
 *               email:
 *                 type: string
 *                 example: hemanth@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   _id: "661234abcd1234abcd1234ab"
 *                   name: "Hemanth Kumar"
 *                   email: "hemanth@example.com"
 *                   role: "viewer"
 *                 token: "jwt_token_here"
 *       400:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "All fields are required"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: hemanth@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   _id: "661234abcd1234abcd1234ab"
 *                   name: "Hemanth Kumar"
 *                   email: "hemanth@example.com"
 *                   role: "admin"
 *                   isActive: true
 *                   lastLogin: "2026-04-05T19:41:21.667Z"
 *                 token: "jwt_token_here"
 *       400:
 *         description: error response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid Credentials"
 */