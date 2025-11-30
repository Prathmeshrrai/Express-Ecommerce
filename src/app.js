import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { sendEmail } from "./utils/mailHelper.js";
import authRoutes from "./routes/auth.route.js";


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

app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Hello from Render API");
});

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail(
      "raiprathmesh71@gmail.com",
      "Test Email",
      "<h1>Resend Working!</h1><p>This is a test email.</p>"
    );

    res.json({ success: true, message: "Email sent via Resend!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
