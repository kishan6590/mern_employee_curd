import t_login from "../model/Login.model.js";
import jwt from "jsonwebtoken";
const loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    const user = await t_login.findOne({ f_userName, f_Pwd });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    };

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        f_sno: user.f_sno,
        name: user.f_userName,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Login failed", seccess: false, error });
  }
};

const logoutUser = async (req, res) => {
  const cookieOption = {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("token", "", cookieOption);

  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};
export { logoutUser, loginUser };
