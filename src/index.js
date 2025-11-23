import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your app
import app from "./app.js";

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// import dotenv from "dotenv";
// import app from "./src/app.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import router from "./src/Routes/index.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: true,
//   credentials: true
// }));

// app.use(cookieParser());

// app.use("/api", router);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hello from Render API");
// });

// // 404
// app.use((_req, res) => {
//   return res.status(404).json({
//     success: false,
//     message: "Route not found"
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// export default app;


// // // import "module-alias/register.js";
// // // import app from "./src/app.js";
// // // import express from "express";
// // // import cors from "cors";
// // // import dotenv from "dotenv";

// // // dotenv.config();

// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());

// // // // your existing routes
// // // import router from "./src/Routes/index.js";
// // // app.use("/api", router);

// // // if (!process.env.VERCEL) {
// // //   const PORT = process.env.PORT || 3000;
// // //   app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
// // // }

// // // app.get("/", (req, res) => {
// // //   res.send("API is running...");
// // // });

// // // export default app;


// // import "module-alias/register.js";
// // import app from "./src/app.js";

// // // Vercel requires *ONLY export*, no listen
// // export default app;

// // // Local development only
// // if (!process.env.VERCEL) {
// //   const PORT = process.env.PORT || 5000;
// //   app.listen(PORT, () => {
// //     console.log(`🚀 Server running locally on port ${PORT}`);
// //   });
// // }
