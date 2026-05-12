import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createBill, getBill, listBills } from "../controllers/billController.js";

const router = Router();

router.get("/", asyncHandler(listBills));
router.post("/", asyncHandler(createBill));
router.get("/:id", asyncHandler(getBill));

export default router;
