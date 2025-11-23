import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello from Render API");
});

app.get("/debug-paths", (req, res) => {
  res.json({
    cwd: process.cwd(),
    filename: __filename,
    dirname: __dirname,
  });
});


export default app;


//export default {};


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import routes from "./Routes/index.js";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: true,
//   credentials: true
// }));

// app.use(cookieParser());

// // Main API routes
// app.use("/api", routes);

// // Test route
// app.get("/", (_req, res) => {
//   res.send("Hello Prathmesh API");
// });

// // 404
// app.use((_req, res) => {
//   return res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// export default app;


// // import cookieParser from "cookie-parser";
// // import express from "express";
// // import routes from "./Routes/index.js";
// // import cors from "cors";

// // const app = express()
// // const PORT = process.env.PORT || 5000;


// // app.use(express.json())
// // app.use(express.urlencoded({extended:true}))
// // //app.use(cors())
// // app.use(cors({
// //   origin: true,
// //   credentials: true
// // }));

// // app.use(cookieParser())

// // app.use("/api/v1/", routes)

// // app.get("/", (_req, res)=>{
// //     res.send("Hello there prathmesh-API");
// // });

// // app.use((_req, res) => {
// //   return res.status(400).json({
// //     success: false,
// //     message: "Route not found",
// //   });
// // });


// // app.listen(PORT, () => {
// //   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// // });

// // export default app;