import { createContext, useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";



const backendUrl = import.meta.env.VITE_BACKEND_URL ;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const[token, setToken] = useState(localStorage.getItem("token") );

    const[authUser, setAuthUser] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [socket, setSocket] = useState(null);

//check if user is authenticated and if so fetch user data and connect to socket server


const checkAuth = async () => {
   try{
  const {data} =   await axios.get("/api/auth/check");
  if(data.success){
    setAuthUser(data.user);
    connectSocket(data.user);
  }

    }catch(error){
        toast.error(error.message);
        
   }
}



//login function to authenticate user and get token and user data and connect to socket server

const login = async (state, credentials) => {
    try{
        const {data} = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success){
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"] = data.token;
            setToken(data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }
    catch(error){
       toast.error(error.message);
    }
}

//logout function to clear user data and disconnect from socket server

const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket.disconnect();
}

//update profilr function to handle user profile updates

const updateProfile = async (body) => {
    try{
        const {data} = await axios.put("/api/auth/update-profile", body);
        console.log("Update profile response:", data);
        if(data.success){
            console.log("Setting authUser to:", data.user);
            setAuthUser(data.user);
            toast.success("Profile updated successfully");
            return true;
        } else {
            toast.error(data.message || "Failed to update profile");
            return false;
        }
    }catch(error){
        console.error("Update profile error:", error);
        toast.error(error.response?.data?.message || error.message);
        return false;
    }
}

//connect socket function to handle socket connection and online users update

const connectSocket = (userData) => {
    if(!userData|| socket?._connected) return;
    const newSocket = io(backendUrl, {
        query: {
            userId: userData._id
        }
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("onlineUsers", (usersIds) => {
        setOnlineUsers(usersIds);
    })
}





useEffect(() => {

    if(token){
        axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
},[])
const value = {
        axios,
        authUser,
        onlineUsers,    
        socket,
        login,
        logout,
        updateProfile
       
    }



return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}