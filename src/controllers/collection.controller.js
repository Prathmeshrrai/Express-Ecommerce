import Collection from "mongoose";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

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

export const updateCollection = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    const {id : collectionId} = req.params;

    if(!name){
        throw new CustomError("collection name is required", 400)
    }


    let updatedCollection= await Collection.findByIdAndUpdate(collectionId,{
        name:name
    },{
        new:true,
        runValidators:true
    })

    if(!updatedCollection){
        throw new CustomError("collection is not updated", 400)
    }

    res.status(200).json({
        message:"Collection updated successfully",
        updateCollection
    })
})

export const deleteCollection = asyncHandler(async(req,res)=>{
    const {id:collectionId} = req.params

    const collectionToDelete = await Collection.findById(collectionId)

    if(!collectionToDelete){
        throw new CustomError("collection is not deleted", 400)
    }  

    await collectionToDelete.remove()


})

export const getAllcollection = asyncHandler(async(req,res)=>{
    collection = collectionfind({})

    if(!collection){
        throw new CustomError("collection is not available", 400)
    }
})