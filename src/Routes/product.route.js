import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();

// 🧾 Add new product (Admin only)
router.post("/add", isLoggedIn, authorize(AuthRoles.ADMIN), addProduct);

// 📦 Get all products
router.get("/", getAllProducts);

// 🔍 Get single product
router.get("/:id", getProductById);

// ✏️ Update product (Admin only)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateProduct);

// 🗑️ Delete product (Admin only)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteProduct);

export default router;
