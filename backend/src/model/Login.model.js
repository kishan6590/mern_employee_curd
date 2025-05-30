import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  f_sno: {
    type: Number,
    required: true,
    unique: true,
  },
  f_userName: {
    type: String,
    required: true,
    unique: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});
/**
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
 */
const t_login = mongoose.model("t_login", userSchema);
export default t_login;
