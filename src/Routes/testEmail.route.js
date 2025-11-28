import express from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import testEmailRoutes from "./testEmail.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

// Add this
router.use(testEmailRoutes);

export default router;
