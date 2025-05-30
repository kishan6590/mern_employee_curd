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
    
    origin: "https://mernemployeemanagement.netlify.app",
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

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/employee", employeeRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
