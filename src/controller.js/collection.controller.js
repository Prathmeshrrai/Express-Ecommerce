import Collection from "mongoose";
import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";

export const createCollection = asyncHandler(async(req,res)=>{
    const {name} = req.body

    if(!name){
        throw new CustomError("collection name is required", 400)
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success:true,
        message: "collection was created successfully",
        collection
    })
})