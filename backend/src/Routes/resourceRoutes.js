import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from "../controllers/resourceController.js";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(listResources));
router.post("/", asyncHandler(createResource));
router.get("/:id", asyncHandler(getResource));
router.patch("/:id", asyncHandler(updateResource));
router.delete("/:id", asyncHandler(deleteResource));

export default router;

