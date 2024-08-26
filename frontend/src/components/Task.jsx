import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Task = ({description, title, priority, status,id}) => {
  const [progress, setTaskProgress] = useState(status);
  const [imp,setImp]=useState(priority)
  const {updatePriority,updateStaus}=useAuth();
  const handleStatus =async () => {
    const newStatus = progress === "incomplete" ? "completed" : "incomplete";
    await updateStaus({ id, status: newStatus });
    setTaskProgress(newStatus);
  };
  const handlePriority=async (e)=>{
    const newPriority=e.target.value;
      setImp(newPriority)
        await updatePriority({id,priority:newPriority});
  }
  // Set priority for demonstration (change this dynamically based on actual data)
 // Could be "High", "Medium", or "Low"

  const priorityColor = {
    High: "bg-red-200 text-red-700",
    Medium: "bg-orange-200 text-orange-700",
    Low: "bg-green-200 text-green-700",
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <select className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${priorityColor[imp]}`} onChange={handlePriority} value={imp}>
        <option value="High">High Priority</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
      </select>
      <button
        onClick={handleStatus}
        className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
          progress === "incomplete" ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"
        }`}
      >
        {progress}
      </button>
    </div>
  );
};

export default Task;
