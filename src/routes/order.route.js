import { Router } from "express";
import { 
    generateOrder, 
    generateRazorpayOrderId, 
    getAllOrders, 
    getMyOrders, 
    updateOrderStatus 
    } from "../controllers/controller.js";
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/generate", isLoggedIn, generateOrder);

router.post("/razorpay", isLoggedIn, generateRazorpayOrderId);

router.get("/my", isLoggedIn, getMyOrders);

router.get("/all", isLoggedIn, authorize(AuthRoles.ADMIN), getAllOrders);

router.put("/:orderId", isLoggedIn, authorize(AuthRoles.ADMIN), updateOrderStatus);

export default router;