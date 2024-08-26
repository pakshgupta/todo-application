import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AddTaskCard = () => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();
const {addTask}=useAuth();
  const handleClick = () => {
    setIsActive(true);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(title, description, priority);
    setIsActive(false);
    await addTask({title,description,priority})
    navigate("/mytask");
    setTitle("");
    setDescription("");
    setPriority("");
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {!isActive ? (
        <div className="flex justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
          <CiCirclePlus className="text-4xl" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <textarea
            placeholder="Enter your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
            rows={4}
          ></textarea>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition-colors"
          >
            Add Task
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTaskCard;
