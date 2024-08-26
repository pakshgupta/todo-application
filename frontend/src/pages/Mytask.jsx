import React, { useEffect } from "react";
import AddTaskCard from "../components/Addtaskcard";
import Task from "../components/Task.jsx";
// import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
const Mytask = () => {
  // useEffect(()=>{
  //   const task=async ()=>{
  //   try {
  //      const data= await axios.get("http://localhost:4000/api/v1/task/display",{withCredentials: true,});
  //     //  console.log(data);
  //      if(data.success===false)
  //       console.log("data not come")
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   }
  //   task();
  // },[])
  const {userTask,task}=useAuth();
  useEffect(()=>{
    userTask();
  })
  return (
    <>
      <div className="flex m-4">
      {task?.map((item,index)=>(
        <Task  key={index} description={item.description} title={item.title} priority={item.priority} status={item.status} id={item._id} />
      ))}
      <AddTaskCard />
      </div>
    </>
  );
};

export default Mytask;
