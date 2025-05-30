import express from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
import { userLoginValidator } from "../validators/index.js";

const router = express.Router();

router.post("/login", userLoginValidator(), validate, loginUser);
router.get("/logout", isLoggedIn, logoutUser);
export default router;
