import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";



router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1

        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]), registerUser)

// here we can create more route for user like /register 



export default router;