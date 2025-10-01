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

        let imgArray = await product.create({
            _id : productId,
            photos: imgArray,
            ...fields
        })

        if(!product){
            throw new CustomError("product failed to be created in DB",400)
        }

        res.status(200).json({
            success: true,
            product
        })
    })
})

export const getAllproducts= asyncHandler(async(req,res)=>{
    const products = await product.find({})

    if(!products){
        throw new CustomError("no products found ",400)
    }

    res.status(200).json({
        success:true,
        products
    })
})

export const getproductById= asyncHandler(async(req,res)=>{
    const {id:products} = req.params

    const product = await product.findById(productId)

    if(!product){
        throw new CustomError("no products found ",400)
    }

    res.status(200).json({
        success:true,
        product
    })
})

export const getproductBycollectionId= asyncHandler(async(req,res)=>{
    const {id:collectionId} = req.params

    const products = await product.find({collectionId})

    if(!products){
        throw new CustomError("no products found ",400)
    }

    res.status(200).json({
        success:true,
        products
    })
})

export const deleteproduct = asyncHandler(async(req,res)=>{
    const {id:productId} = req.params

    const product = await product.findById(productId)

    if(!product){
        throw new CustomError("no products found ",400)
    }

    const deletephotos = Promise.all(
        product.photos.map(async(elem,index)=>{
            await S3deleteFile{
                bucketName:config.S3_BUCKET_NAME;
                key: `products/${product._id.toString()}/photo_${index + 1}.png`
            }
        })
    ) 
    await deletephotos;

    await product.remove()

    res.status(200).json({
        success:true,
        message: "product has been deleted successfully"
    })
})