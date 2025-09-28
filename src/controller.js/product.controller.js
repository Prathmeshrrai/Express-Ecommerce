import product from "../models/product.schema.js";
import formidable from "formidable";
import { S3FileUpload,S3deleteFile } from "../service/imageUpload.js";
import mongoose from "mongoose";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";

export const addProduct = asyncHandler(async(req,res)=>{
    const form = formidable({multiples:true, keepExtensions:true})
    form.parse(req, async function(err, fields, files){
        if(err){
            throw new CustomError(err.message || "something went wrong", 500)
        }

        let productId = new mongoose.Types.ObjectId().toHexString()

        console.log(fields, files);

        if(
            !fields.name||
            !fields.price||
            !fields.description||
            !fields.collectionId
        )
        
        if(!fields){
            new CustomError("please fill all the fields",500);
        }

        let imgArrayResp = Promise.all(
            Object.keys(files).map(async(files,index) =>{
                const element= File[filekey]
                console.log(element);
                const data = FSx.readFileSync[element.filepath]

                const upload = await S3FileUpload({
                    bucketName: config.S3_BUCKET_NAME,
                    key:`products/${productId}/photo_${index + 1}.png`,
                    body:data,
                    contentType:element.mimetype
                })

                console.log(upload);
                return(
                    secure_url: upload.location
                )
            })
        )
    })
})