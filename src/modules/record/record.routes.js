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