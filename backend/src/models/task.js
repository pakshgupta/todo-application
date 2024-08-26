import mongoose, { mongo } from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      default: "Low",
      enum:["Low","Medium","High"]
    },
    status: {
      type: String,
      default: "incomplete",
      enum: ["incomplete","completed"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt:{
        type:Date,
    }
  },
  { timestamps: true }
);

export const Task=mongoose.model("Task",taskSchema);