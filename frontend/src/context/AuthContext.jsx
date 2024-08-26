import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const storedUser=localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isUser, setIsUser] = useState(false);
    const [task,setTask]=useState(null);
    const registerUser = async ({ name, email, password }) => {
        try {
            await axios.post('http://localhost:4000/api/v1/user/signup', {
                name,
                email,
                password
            });
            
        } catch (error) {
            console.error("Error registering user:", error); // Handle errors here
        }
    };
    const loginUser=async ({email,password})=>{
        try {
            const {data}=await axios.post('http://localhost:4000/api/v1/user/signin',{
                email,
                password
            },{
                withCredentials: true 
            });
             // Assuming data is the user object
             setUser(data.data);
             setIsUser(false)
             localStorage.setItem('user',JSON.stringify(data.data));
        } catch (error) {
            console.error("Error Login user:", error); // Handle errors here
        }

    }
    const logoutUser=async ()=>{

       try {
         await axios.get('http://localhost:4000/api/v1/user/logout',{
            withCredentials:true
         });
         setUser(null);
         localStorage.removeItem('user');
         window.location('/')
       } catch (error) {
        console.log("Error while log out user",error);
       }
    }
    const userTask=async()=>{
        try {
            const {data}=await axios.get('http://localhost:4000/api/v1/task/display',{
                withCredentials:true,
            });
            setTask(data.data);
            // console.log(data);
        } catch (error) {
            console.log("Error is occured ",error);
        }
    }
    const updatePriority=async({id,priority})=>{
        try {
            await axios.patch(`http://localhost:4000/api/v1/task/update-priority/${id}`,{
                priority,
            },{
                withCredentials:true,
            })
            
        } catch (error) {
            
            console.log("Error while updating priority",error);
        }

    }
    const updateStaus=async({id,status})=>{
        try {
            await axios.patch(`http://localhost:4000/api/v1/task/update-status/${id}`,{
                status,
            },{
                withCredentials:true,
            })
        } catch (error) {
            console.log("Error while updating status",error);
            
        }
    }
    const addTask=async ({title,description, priority})=>{
       try {
        await axios.post("http://localhost:4000/api/v1/task/create",{
            title,
            description,
            priority
        },{
            withCredentials:true
        })
       } catch (error) {
        console.log("enable to create a task");
       }
    }
    return (
        <AuthContext.Provider value={{user,registerUser,loginUser,isUser,setIsUser,logoutUser,userTask,task,updatePriority,updateStaus,addTask}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}