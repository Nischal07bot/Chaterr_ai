import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Project = () => {
    const location=useLocation();
    console.log(location.state);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
    return (
        <div>
            <main
            className="h-screen w-screen flex">
            <section className="left relative h-screen min-w-72 bg-blue-300 flex flex-col">
            {/* Header */}
            <header className="flex justify-end p-2 px-4 w-full bg-slate-200">
    <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)} className="p-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
      <i className="ri-group-fill text-xl"></i>
    </button>
            </header>

           {/* Chat Messages Container */}
            <div className="flex flex-col flex-grow gap-4  overflow-y-auto bg-blue-300 w-full">
               <div className="incoming flex flex-col p-2 bg-white rounded-md w-fit  max-w-sm mr-4">
                <small className="opacity-65 text-sm">example@gmail.com</small>
                <p className="text-sm">lorem5 ipsum dolor sit amet consectetur adipisicing elit bbbbbbbbbbbbbbbbbbbbbb.</p>
               </div>
               <div className="ml-auto flex flex-col p-2 bg-gray-400 rounded-md w-fit  max-w-sm">
                <small className="opacity-65 text-sm">example@gmail.com</small>
                <p className="text-sm">lorem5 ipsum dolor sit amet consectetur adipisicing elit bbbbbbbbbbbbbbbbbbbbbb.</p>
               </div>
            </div>
  {/* Message Input Bar (Fixed at Bottom) */}
  <div className="sticky bottom-0 w-full p-4 bg-blue-300">
    <div className="flex items-center w-full max-w-lg mx-auto bg-white p-2 rounded-full border border-gray-300 shadow-md">
      {/* Message Input */}
      <input 
        className="flex-grow bg-transparent p-2 outline-none text-gray-700"
        placeholder="Enter your message"
      />
      
      {/* Send Button */}
      <button className="p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
        <i className="ri-send-plane-fill text-lg"></i>
      </button>
    </div>
  </div>
  {/* Sidebar */}
  <div className={`sidePanel flex flex-col gap-2 w-full h-full bg-blue-100 absolute transition-all  ${isSidebarOpen?'-translate-x-0':`-translate-x-full`} top-0`}>
    <header className="flex justify-end p-2 px-3 bg-slate-200">
      <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)} className="p-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
        <i className="ri-close-fill text-xl"></i>
      </button>
    </header>
    <div className="users flex flex-col gap-2">
      <div className="userpanel flex gap-2 items-center bg-gray-300 p-2 hover:bg-gray-400 cursor-pointer">
      <div className="user  flex  w-fit h-fit items-center justify-center rounded-full p-3 bg-blue-500 text-white">
         <i className="ri-user-3-fill"></i>
      </div>
      <h1 className="flex font-semibold text-lg">User1</h1>
      </div>
      
    </div>
  </div>
</section>

            </main>
        </div>
    );
}
export default Project; 