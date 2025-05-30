import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    f_Id: {
      type: Number,
    },
    f_Name: {
      type: String,
    },
    f_Email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    f_Mobile: {
      type: String,
      required: true,
      unique: true,
    },
    f_Designation: {
      type: String,
      enum: ["HR", "MANAGER", "SALES"],
    },
    f_gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    f_Course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      required: true,
    },
    f_Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const t_Employee = mongoose.model("t_Employee", userSchema);
export default t_Employee;
