import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default supabase;

// import aws from "aws-sdk";
// import config from "./index.js"

// const S3 = new aws.S3({
//     accessKeyId: config.S3_ACCESS_KEY,
//     secretAccessKey: config.S3_SECRET_ACCESS_KEY,
//     region:config.S3_REGION
// })

// export default S3;


