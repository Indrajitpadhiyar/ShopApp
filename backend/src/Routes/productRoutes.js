import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createProduct,
  deleteProduct,
  deleteProductsBulk,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", asyncHandler(listProducts));
router.post("/", asyncHandler(createProduct));
router.post("/bulk-delete", asyncHandler(deleteProductsBulk));
router.get("/:id", asyncHandler(getProduct));
router.patch("/:id", asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

export default router;

