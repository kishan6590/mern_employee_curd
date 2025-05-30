import { body } from "express-validator";

const userLoginValidator = function () {
  return [
    body("f_userName").notEmpty().withMessage("Username can not empty"),
    body("f_Pwd").notEmpty().withMessage("Password can not empty"),
  ];
};

const employeeValidator = function () {
  return [
    body("f_Name").notEmpty().trim().withMessage("Name is required"),
    body("f_Email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Invalid email format")
      .matches(/@gmail\.com$/),
    body("f_Designation")
      .notEmpty()
      .isIn(["HR", "MANAGER", "SALES"])
      .withMessage("Invalid designation"),
    body("f_gender").notEmpty().isIn(["M", "F"]).withMessage("Invalid gender"),
    body("f_Course")
      .notEmpty()
      .isIn(["MCA", "BCA", "BSC"])
      .withMessage("Invalid Course"),

    body("f_Mobile")
      .notEmpty()
      .isMobilePhone("en-IN")
      .isLength({ min: 10, max: 10 })
      .withMessage("Invalid phone number"),
  ];
};

const employeeUpdateValidator = function () {
  return [
    body("f_Name").optional({ checkFalsy: true }).trim(),
    body("f_Email")
      .trim()
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email format")
      .matches(/@gmail\.com$/),

    body("f_Designation")
      .optional({ checkFalsy: true })
      .isIn(["HR", "MANAGER", "SALES"]),

    body("f_gender")
      .optional({ checkFalsy: true })
      .isIn(["M", "F"])
      .withMessage("Invalid gender"),
    body("f_Course").optional({ checkFalsy: true }).isIn(["MCA", "BCA", "BSC"]),

    body("f_Mobile")
      .optional({ checkFalsy: true })
      .isMobilePhone("en-IN")
      .isLength({ min: 10, max: 10 }),
  ];
};

export { userLoginValidator, employeeValidator, employeeUpdateValidator };
