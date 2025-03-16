import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Project = () => {
    const location=useLocation();
    console.log(location.state);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [ selectedUserId, setSelectedUserId ] = useState([])
    const users = [
      { id: 1, name: 'User One' },
      { id: 2, name: 'User Two' },
      { id: 3, name: 'User Three' },
      { id: 4, name: 'User Four' },
      { id: 5, name: 'User Five' },
      { id: 6, name: 'User Six' },
      { id: 7, name: 'User Seven' },
      { id: 8, name: 'User Eight' },
      { id: 9, name: 'User Nine' },
      { id: 10, name: 'User Ten' },
  ]
  const handleUserClick = (id) => {
    setSelectedUserId([ ...selectedUserId, id ])

}
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
      <div className="flex items-center gap-2">
      <button
      onClick={()=> setIsModalOpen(true)} 
      className="absolute left-0  flex items-center gap-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
      <i className="ri-user-add-fill"></i>
      <p>Add Collabrator</p>
      </button>
      </div>
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
            {isModalOpen && (
                <div className="fixed inset-0  flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.indexOf(user.id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user.id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.name}</h1>
                                </div>
                            ))}
                        </div>
                        <button className='absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
            {/* Collaborator Modal */}
      
        </div>
    );
}
export default Project; 