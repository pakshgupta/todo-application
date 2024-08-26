import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const validateJWT=asyncHandler(async (req,res,next)=>{
    const token=req?.cookies?.token || req.header('Authorization')?.replace("Bearer ","");

    if(!token){
        throw new ApiError(409,"Unauthorized user request");
    }
    const decodedToken=jwt.verify(token,process.env.SECRET);
   
    const user=await User.findById(decodedToken?._id).select("-password")
    if(!user){
        throw new ApiError(404,"Invalid Token");
    }
    req.user=user;
    next();
})