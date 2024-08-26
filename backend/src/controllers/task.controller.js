import { Task } from "../models/task.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTaskController = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  if ([title, description, priority].some((field) => field?.trim === ""))
    throw new ApiError(404, "All feilds are required");
  const task = await Task.create({
    title,
    description,
    priority,
    owner: req.user._id,
  });
  if (!task) {
    throw new ApiError(500, "Interanl server error");
  }
  res.status(200).json(new ApiResponse(200, "Task created successfully"));
});

export const showTaskController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(409, "Invalid user id");
  }
  const userTask = await Task.find({ owner: userId });
  // console.log(userTask);
  if (!userTask) {
    throw new ApiError(500,userTask,"Internal Server Error");
  }
  res
    .status(200)
    .json(new ApiResponse(200, userTask, "User task fetched successfully"));
});

export const deleteTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(409, "Invalid Id");
  }
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    throw new ApiError(500, "Internal sever error while deleting the task");
  }
  res.status(200).json(new ApiResponse(200, "Task Deleted successfullyf"));
});

export const updatePriorityController = asyncHandler(async (req, res) => {
  const { priority } = req.body;
  if (!priority) {
    throw new ApiError(400, "Priority is required");
  }
  const { id } = req.params;
  if (!id) {
    throw new ApiError(409, "Invalid Id");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        priority,
      },
    },
    { new: true }
  );
  if (!updatedTask) {
    throw new ApiError(500, "Unable to update priority");
  }
  await updatedTask.save();
  res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export const updateStatusController = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    throw new ApiError(400, "Status is required");
  }
  const { id } = req.params;
  if (!id) {
    throw new ApiError(409, "Invalid Id");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
      },
    },
    { new: true }
  );
  if (!updatedTask) {
    throw new ApiError(500, "Unable to update status");
  }
  updatedTask.save();
  res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export const searchTaskController = asyncHandler(async (req, res) => {
  const { search,page } = req.query;
  const task = await Task.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  });
  if (task.length === 0) {
    throw new ApiError(404, "Task not found");
  }
  res.status(200).json(new ApiResponse(200, task, "Task fetched successfully"));
});
