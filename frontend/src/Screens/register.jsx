import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleclick(e) {
        e.preventDefault();
        axios.post("/users/register", { email, password })
            .then((res) => {
                console.log(res.data);
                navigate("/login"); // Navigate to login after successful registration
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-96 animate-fade-in">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/50"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/50"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                        />
                    </div>
                    <button
                        onClick={handleclick}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-600">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
