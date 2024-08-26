import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const generateToken = (_id, name, email) => {
  const payload = {
    _id,
    name,
    email,
  };
  return jwt.sign(payload, process.env.SECRET);
};
export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All feilds are required");
  const data=await User.create({
    name,
    email,
    password,
  });
  res.status(200).json(new ApiResponse(200, data,"user created successfully "));
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) throw new ApiError(404, "All Feilds are required");
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "user not found");
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  // console.log(isPasswordCorrect);
  if (!isPasswordCorrect) throw new ApiError(409, "Invalid user credentials");
  const token = generateToken(user._id, user.name, user.email);
  // console.log(token);
  const options = {
    httpOnly: true,
    secure: false,
    expires:new Date(Date.now()+25892000000)
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "User Logged In successfully"));
});

export const logoutController = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: false,
  };
  res
    .clearCookie("token", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});
