import express from "express";
import {
  employeeCreate,
  employeeDelete,
  employeeList,
  employeeUpdate,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/multer.middeware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
  employeeUpdateValidator,
  employeeValidator,
} from "../validators/index.js";
import { validate } from "../middleware/validator.middleware.js";

const router = express.Router();
router.post(
  "/create",
  isLoggedIn,
  upload.single("f_Image"),
  employeeValidator(),
  validate,
  employeeCreate
);
router.get("/all", isLoggedIn, employeeList);
router.patch(
  "/update/:id",
  isLoggedIn,
  upload.single("f_Image"),
  employeeUpdateValidator(),
  validate,
  employeeUpdate
);
router.delete("/delete/:id", isLoggedIn, employeeDelete);

export default router;
