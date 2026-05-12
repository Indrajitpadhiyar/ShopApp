import { Router } from "express";
import authRoutes from "./authRoutes.js";
import resourceRoutes from "./resourceRoutes.js";
import productRoutes from "./productRoutes.js";
import billRoutes from "./billRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);
router.use("/products", productRoutes);
router.use("/bills", billRoutes);

export default router;

