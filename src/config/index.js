import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://localhost:27017/test" ,
    JWT_SECRET : process.env.JWT_SECRET || "secreto",
    JWT_EXPIRY : process.env.JWT_EXPIRY || "30d",
    S3_ACCESS_KEY : process.env.S3_ACCESS_KEY,
}

export default config