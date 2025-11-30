import { Router } from "express";
import authRoutes from "./auth.route.js";
import couponRoutes from "./coupon.route.js";
import collectionRoutes from "./collection.route.js";
import productRoutes from "./product.route.js";

import emailTestRoutes from "./emailTest.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/coupon", couponRoutes);
router.use("/collection", collectionRoutes);
router.use("/product", productRoutes);

router.use(emailTestRoutes);

export default router;
