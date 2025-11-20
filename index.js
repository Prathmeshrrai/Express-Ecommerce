// // import mongoose from "mongoose";
// // import app from "./src/app.js";
// // import config from "./src/config/index.js";

// // ( async()=>{
// //     try{
// //         //console.log("Trying to connect:", config.MONGODB_URL);
// //         await mongoose.connect(config.MONGODB_URL)
// //         console.log("Database Connected!!!")

// //         app.on('error', (err)=>{
// //             console.error("ERROR: ", err);
// //             throw err
// //         })

// //         const onListening = () =>{
// //             console.log(`Listening on port ${config.PORT}`);
// //         }

// //         app.listen(config.PORT, onListening)

// //     }catch(err){
// //         //console.error("❌ Mongoose connection error:", err.message);
// //         console.error("ERROR: ",err)
// //         throw err
// //     }
// // })();

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // your existing routes
// import router from "./src/Routes/index.js";
// app.use("/api", router);

// // Only start local server when NOT running on Vercel
// if (!process.env.VERCEL) {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// your existing routes
import router from "./src/Routes/index.js";
app.use("/api", router);

// ✅ REMOVE local server listen completely for Vercel
// ❗ Do NOT run app.listen() on Vercel
// Vercel will import this file inside api/index.js
// and handle requests automatically

// Only start local server when running on localhost (not Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
