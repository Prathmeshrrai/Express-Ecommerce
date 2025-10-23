import { Router } from "express";
import {createCoupon, deleteCoupon, getAllCoupons, updateCoupon} from "../controllers/coupon.controller.js";
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router()

export default router;