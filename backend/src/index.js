import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "https://mern-employee.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect to db
connectDB();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Home", success: true });
});
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/employee", employeeRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
