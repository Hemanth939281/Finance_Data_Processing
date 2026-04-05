import express from "express";
import {
  create,
  getAll,
  update,
  remove
} from "./record.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import authorizeRoles from "../../middleware/role.middleware.js";

const router = express.Router();

// CREATE -> Admin
router.post("/create", authMiddleware, authorizeRoles("admin"), create);

// GET -> Analyst + Admin
router.get("/", authMiddleware, authorizeRoles("analyst", "admin"), getAll);

// UPDATE -> Admin
router.patch("/:id", authMiddleware, authorizeRoles("admin"), update);

// DELETE -> Admin
router.delete("/:id", authMiddleware, authorizeRoles("admin"), remove);

export default router;