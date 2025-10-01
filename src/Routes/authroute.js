import {Router} from "express";

const router = Router ()

router.post("/signup", signup)

router.post("/login", login)
router.get("/logout", logout)
router.get("/profile", isloggedIn, getprofile)

export default router;