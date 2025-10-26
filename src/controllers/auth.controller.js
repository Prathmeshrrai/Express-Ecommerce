import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/customError.js";
import User from "../models/user.schema.js";
import mailHelper from "../utils/mailHelper.js"


export const signUp = asyncHandler(async(req ,res) => {
    const{name, email, password} = req.body

    if(!name || !email || !password){
        throw new CustomError("please add all fields", 400)
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new CustomError("User already exists", 400) 
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()
    user.password = undefined

    res.status(200).json({
        success: true,
        token,
        user
    })
})

export const getProfile = asyncHandler(async(req,res)=>{
    const {user} = req

    if(!user){
        throw new CustomError("User not found",401)
    }

    res.status(200).json({
        success:true,
        user
    })
})

//getProfile, login, logout, signUp, forgotPassword, resetPassword 