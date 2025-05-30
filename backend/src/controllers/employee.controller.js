import t_Employee from "../model/Employee.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const employeeCreate = async function (req, res) {
  
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  try {
    const existingEmployee = await t_Employee.findOne({ f_Email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
        success: false,
      });
    }
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }

    const lastEmployee = await t_Employee.findOne().sort({ f_Id: -1 });
    const id = lastEmployee ? lastEmployee.f_Id + 1 : 1;
    const employee = await t_Employee.create({
      f_Id: id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image: image.url,
    });

    if (!employee) {
      return res.status(500).json({
        message: "Something went wrong while registering the Employee",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Employee Created Successfully",
      success: true,
      employee,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registred",
      error,
      success: false,
    });
  }
};

const employeeDelete = async function (req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "Employee not found",
      success: false,
    });
  }

  try {
    const deletedEmployee = await t_Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
      deletedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting employee",
      success: false,
      error,
    });
  }
};

const employeeList = async function (req, res) {
  try {
    const employees = await t_Employee.find().sort({ f_Id: 1 });
    if (!employees) {
      return res.status(400).json({
        message: "Error in Fetching Employees",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {}
};

const employeeUpdate = async function (req, res) {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Employee not found",
      success: false,
    });
  }

  try {
    const existingEmployee = await t_Employee.findById(id);

    if (!existingEmployee) {
      return res.send(400).json({
        message: "User not found",
        success: false,
      });
    }

    const imageLocalPath = req.file?.path;
    const image = await uploadOnCloudinary(imageLocalPath);

    existingEmployee.f_Name = f_Name || existingEmployee.f_Name;
    existingEmployee.f_Email = f_Email || existingEmployee.f_Email;
    existingEmployee.f_Designation =
      f_Designation || existingEmployee.f_Designation;
    existingEmployee.f_Course = f_Course || existingEmployee.f_Course;
    existingEmployee.f_Mobile = f_Mobile || existingEmployee.f_Mobile;
    existingEmployee.f_gender = f_gender || existingEmployee.f_gender;

    existingEmployee.f_Image = image?.url || existingEmployee.f_Image;

    await existingEmployee.save();

    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      existingEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating employee",
      success: false,
      error,
    });
  }
};

export { employeeCreate, employeeDelete, employeeList, employeeUpdate };
