import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import userSchema from "../models/user.schema";

export const signUp = asyncHandler(async(req ,res) => {
    const{name, email, password} = req.body

    if(!name || !email || !password){
        throw new CustomError("please add all fields", 400)
    }

})