import React, { useContext} from 'react';
import { UserContext } from '../context/user.context.jsx';
import { useNavigate } from "react-router-dom";
import axios from '../config/axios.js';
const Home = () => {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext)
     const navigate = useNavigate();
    const userr=true;

    console.log("Home component rendered");
    console.log("User context:", user);
    function clickdashboard(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
    
        axios
          .get("/users/dashboard", {
              headers: {
                  Authorization: `Bearer ${token}`, // Ensure token is sent
              },
          })
          .then((res) => {
              console.log("***");
              console.log(res.data.user);
              localStorage.setItem("token", res.data.token);
              setUser(res.data.user);
              navigate("/dashboard");
          })
          .catch((err) => {
              console.error("Axios request failed:", err);
          });
    }
    

         

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-96 animate-fade-in text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome</h1>
                {user? (
                    <p className="text-gray-600 mb-8">Welcome back, {user.name}!</p>
                ) : (
                    <p className="text-gray-600 mb-8">Please sign in or create a new account to continue</p>
                )}
                <div className="space-y-4">
                    {user ? (
                        <a 
                            onClick={clickdashboard}
                            className="block w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105"
                        >
                            Go to the Creating Projects Dashboard
                        </a>
                    ) : (
                        <>
                            <a 
                                href="/login"
                                className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105"
                            >
                                Sign In
                            </a>
                            <a
                                href="/register" 
                                className="block w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105"
                            >
                                Register
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
