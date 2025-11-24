import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/customError.js";
import User from "../models/user.schema.js";
import { sendEmail } from "../utils/mailHelper.js"
import crypto from "crypto";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  httpOnly: true,
  //secure: process.env.NODE_ENV === "production",
  secure: false,
  sameSite: "lax"
};


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

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })
})

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //validation
    if (!email || !password) {
        throw new CustomError("PLease fill all details", 400)
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (isPasswordMatched) {
        const token = user.getJWTtoken()
        user.password = undefined
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Password is incorrect", 400)
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
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

export const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    //no email
    const user = await User.findOne({email})

    if (!user) {
        throw new CustomError("User not found", 404)
    }

    const resetToken = user.generateForgotPasswordToken()

    await user.save({validateBeforeSave: false})


    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/password/reset/${resetToken}`

    const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`

    try {
        // const options = {}
        // await mailHelper({
        //     email: user.email,
        //     subject: "Password reset mail",
        //     message
        // })
        await sendEmail(
        user.email,
        "Your OTP",
        `<h1>Your OTP is: ${otp}</h1>`
        );
    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save({validateBeforeSave: false})

        throw new CustomError(error.message || "Email could not be sent", 500)
    }

})


export const resetPassword = asyncHandler(async (req, res) => {
    const {token: resetToken} = req.params
    const {password, confirmPassword} = req.body

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt : Date.now() }
    })

    if (!user) {
        throw new CustomError( "password reset token in invalid or expired", 400)
    }

    if (password !== confirmPassword) {
        throw new CustomError("password does not match", 400)
    }

    user.password = password;
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    const token = user.getJWTtoken()
    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        user,
    })
})