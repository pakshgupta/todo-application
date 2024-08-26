import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
const app = express();
const connectDB=async ()=>{
    await mongoose
    .connect(`${process.env.MONGODB_URI}/taskmanager`)
    .then((e) => console.log("mongodb connected sccessfully"))
    .catch((error) => console.error(error));
}
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
    credentials: true
}));
import userRouter from './src/routes/user.route.js'
import taskRouter from './src/routes/task.route.js'
app.use('/api/v1/user/',userRouter);
app.use('/api/v1/task/',taskRouter);








app.listen(process.env.PORT || 4000, () =>
  console.log("app is running at port no.", process.env.PORT)
);
