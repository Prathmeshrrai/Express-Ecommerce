import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));

app.use(cookieParser());

// API routes
app.use("/api", router);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Render API");
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
