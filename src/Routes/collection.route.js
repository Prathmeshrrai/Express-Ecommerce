import { Router } from "express";
import { createCollection, deleteCollection, getAllcollection, updateCollection } from "../controllers/collection.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection)

// delete a single collection
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection)

//get all collection
router.get("/",  getAllcollection)

export default router;

