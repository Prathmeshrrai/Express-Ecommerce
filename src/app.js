import cookieParser from "cookie-parser";
import express from "express";
import routes from "./Routes/index.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use("/api/v1/", routes)

app.get("/", (req,res)=>{
    res.send("Hello there prathmesh-API")
})

app.all("*",(_req, res)=>{
    return res.status(400).json({
        success: false,
        message : "Route not found"
    })
})

export default app;