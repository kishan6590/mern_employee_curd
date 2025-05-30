import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("tokennn", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access",
        status: false,
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
