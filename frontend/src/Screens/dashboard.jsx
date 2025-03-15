import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import { UserContext } from '../context/user.context.jsx';
import "remixicon/fonts/remixicon.css";


const Dashboard = () => {
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [project, setProject] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext)
//console.log(user);
// { headers: { Authorization: `Bearer ${token}` } } // ✅ Move headers to third argument
function createProject(e) {
    e.preventDefault()
    const token = localStorage.getItem("token");
    console.log(projectName);
    axios.post('/projects/create',
        { name: projectName }, // ✅ Send data correctly
        { headers: { Authorization: `Bearer ${token}` } } 
    )
    
        .then((res) => {
            console.log(res)
            setIsModalOpen(false)
        })
        .catch((error) => {
            console.log(error)
        })
}
 useEffect(() => { 
    axios.get("/projects/all").then((res) => {
        console.log(res.data);
        setProject(res.data.projects);
    }).catch((err) => {        
        console.log(err.response.data);
    })
 }, [])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-180 animate-fade-in text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome</h1>
                {user ? (
                    <>
                        <p className="text-gray-600 mb-8">Welcome back, {user.name}!</p>
                        <main className='p-4'>
                            <div className="projects flex flex-wrap gap-3">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="project p-4 border border-slate-300 rounded-md cursor-pointer hover:bg-slate-200">
                                    New Project
                                    <i className="ri-link ml-2"></i>
                                </button>
                                {
                    project.map((project) => (
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                })
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                            <h2
                                className='font-semibold'
                            >{project.name}</h2>

                            <div className="flex gap-2">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>

                        </div>
                    ))
                }
                            </div>
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                                        <h2 className="text-xl mb-4">Create New Project</h2>
                                        <form onSubmit={createProject}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                                <input
                                                    onChange={(e) => setProjectName(e.target.value)}
                                                    value={projectName}
                                                    type="text"
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                                                    onClick={() => setIsModalOpen(false)}>
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </main>
                    </>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8">Please sign in or create a new account to continue</p>
                        <div className="space-y-4">
                            <a
                                href="/login"
                                className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105">
                                Sign In
                            </a>
                            <a
                                href="/register"
                                className="block w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-105">
                                Register
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
