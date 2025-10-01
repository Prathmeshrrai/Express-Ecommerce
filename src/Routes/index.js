import { Router } from "express";
import authRoutes from "./authroute.js"

const router = Router()
router.use("/auth", authRoutes)

