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

/*
import Product from "../models/product.schema.js"
import formidable from "formidable"
import { s3FileUpload, s3deleteFile} from "../service/imageUpload.js"
import Mongoose from "mongoose"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import config from "../config/index.js"
import fs from "fs"


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function (err, fields, files){
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 500)
        }

        let productId = new Mongoose.Types.ObjectId().toHexString()

        console.log(fields, files);

        if (
            !fields.name ||
            !fields.price ||
            !fields.description ||
            !fields.collectionId
        ) {
            throw new CustomError("Please fill all the fields", 500)
            
        }

        

        let imgArrayResp = Promise.all(
            Object.keys(files).map( async (file, index) => {
                const element = file[fileKey]
                console.log(element);
                const data = fs.readFileSync(element.filepath)

                const upload = await s3FileUpload({
                    bucketName: config.S3_BUCKET_NAME,
                    key: `products/${productId}/photo_${index + 1}.png`,
                    body: data,
                    contentType: element.mimetype
                })

                // productId = 123abc456
                // 1: products/123abc456/photo_1.png
                // 2: products/123abc456/photo_2.png

                console.log(upload);
                return {
                    secure_url : upload.Location
                }
            })
        )

        let imgArray = await imgArrayResp

        const product = await Product.create({
            _id: productId,
            photos: imgArray,
            ...fields
        })

        if (!product) {
            throw new CustomError("Product failed to be created in DB", 400)
        }
        res.status(200).json({
            success: true,
            product,
        })


        
    })
})

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    if (!products) {
        throw new CustomError("No products found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})

export const getProductById = asyncHandler(async (req, res) => {
    const {id: productId} = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const getProductByCollectionId = asyncHandler(async(req, res) => {
    const {id: collectionId} = req.params

    const products = await Product.find({collectionId})

    if (!products) {
        throw new CustomError("No products found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})


export const deleteProduct = asyncHandler(async(req, res) => {
    const {id: productId} = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)

    }

    //resolve promise
    // loop through photos array => delete each photo
    //key : product._id

    const deletePhotos = Promise.all(
        product.photos.map(async( elem, index) => {
            await s3deleteFile({
                bucketName: config.S3_BUCKET_NAME,
                key: `products/${product._id.toString()}/photo_${index + 1}.png`
            })
        })
    )

    await deletePhotos;

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product has been deleted successfully"
    })
})