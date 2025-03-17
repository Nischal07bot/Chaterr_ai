import React,{useState,useEffect,useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { initializeSocket ,receiveMessage,sendMessage} from "../config/socket";
import { UserContext } from "../context/user.context";
const Project = () => {
    const location=useLocation();
    console.log(location.state);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [ selectedUserId, setSelectedUserId ] = useState([])
    const [project,setProject]=useState(location.state.project);
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([]); // Separate filtered users state
    const [message,setMessage]=useState("");
    const { user } = useContext(UserContext);
    const messagBox=React.createRef();
    function addCollaborators(){
        //console.log(selectedUserId);
        axios.put("/projects/adduser",{
          projectId:location.state.project._id,
          users:Array.from(selectedUserId)
        }).then(res=>{
            console(res.data);
            setIsModalOpen(false);
            //setSelectedUserId([]); // Clear selection after adding collaborators
        }).catch(err=>{   
            console.log(err.response.data);
        })
    }
    useEffect(()=>{
        initializeSocket(project._id);

        receiveMessage("project-message",(data)=>{
           console.log("hi");
            console.log(data);
            appendIncomingMessage(data);
        })
    },[])
    useEffect(() => {

      axios.get(`/projects/getproject/${location.state.project._id}`).then(res=>{
        console.log(res.data.project);
          setProject(res.data.project);
      }).catch(err=>{
          console.log(err.response.data);
      })
        axios.get("/users/all").then(res=>{
            setUsers(res.data.users)
        }).catch(err=>{ 
            console.log(err.response.data);
        }
)

    }, [setIsModalOpen])
  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if(newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      }
      else {
        newSelectedUserId.add(id);
      }
      return Array.from(newSelectedUserId);
    });

}
function newcaollab(){
  const projectUserIds = new Set(project.users.map(user => user._id));
  const filtered = users.filter(user => !projectUserIds.has(user._id));
  setFilteredUsers(filtered); // Store in a separate state
  setIsModalOpen(true);
}
function appendIncomingMessage(messageObject) {
  const messageBox = document.querySelector('.messbox');
  const incomingMessage = document.createElement('div');
  incomingMessage.className = 'incoming flex flex-col p-2 bg-white rounded-md w-fit max-w-sm mr-4';
  incomingMessage.innerHTML = `
      <small class="opacity-65 text-sm">${messageObject.sender.email}</small>
      <p class="text-sm">${messageObject.message}</p>
  `;
  messageBox.appendChild(incomingMessage);
  messageBox.scrollTop = messageBox.scrollHeight;

}
function appendOutgoingMessage(message){
  const messageBox = document.querySelector('.messbox');
  const incomingMessage = document.createElement('div');
  incomingMessage.className = 'ml-auto flex flex-col p-2 bg-gray-400 rounded-md w-fit  max-w-sm gap-2';
  incomingMessage.innerHTML = `
      <small class="opacity-65 text-sm">${user.email}</small>
      <p class="text-sm">${message}</p>
  `;
  messageBox.appendChild(incomingMessage);
  messageBox.scrollTop = messageBox.scrollHeight;


}
const send = () => {

  sendMessage('project-message', {
      message,
      sender: user
  })
  appendOutgoingMessage(message);
 
  setMessage("")

}

    return (
        <div>
            <main
            className="h-screen w-screen flex">
            <section className="left relative h-screen min-w-72 bg-blue-300 flex flex-col">
            {/* Header */}
            <header className="flex justify-end p-2 px-4 w-full bg-slate-200">
            <div className="flex items-center gap-2">
      <button
      onClick={newcaollab} 
      className="absolute left-0  flex items-center gap-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
      <i className="ri-user-add-fill"></i>
      <p>Add Collabrator</p>
      </button>
      </div>
    <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)} className="p-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
      <i className="ri-group-fill text-xl"></i>
    </button>
            </header>

           {/* Chat Messages Container */}
            <div className="flex flex-col flex-grow gap-4  overflow-y-auto bg-blue-300 w-full">
              <div ref={messagBox}className="messbox p-1 flex-grow flex flex-col gap-1">
              
              </div>
            </div>
  {/* Message Input Bar (Fixed at Bottom) */}
  <div className="sticky bottom-0 w-full p-4 bg-blue-300">
    <div className="flex items-center w-full max-w-lg mx-auto bg-white p-2 rounded-full border border-gray-300 shadow-md">
      {/* Message Input */}
      <input 
         value={message}
         onChange={(e) => setMessage(e.target.value)}
        className="flex-grow bg-transparent p-2 outline-none text-gray-700"
        placeholder="Enter your message"
      />
      
      {/* Send Button */}
      <button
      onClick={send} 
      className="p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
        <i className="ri-send-plane-fill text-lg"></i>
      </button>
    </div>
  </div>
  {/* Sidebar */}
  <div className={`sidePanel flex flex-col gap-2 w-full h-full bg-blue-100 absolute transition-all  ${isSidebarOpen?'-translate-x-0':`-translate-x-full`} top-0`}>
    <header className="flex justify-end p-2 px-3 bg-slate-200">
    <div className="flex items-center gap-2">
      <div
     
      className="absolute left-0  flex items-center gap-2 p-2">

      <h1 className="font-semibold text-lg">Present Collabrators</h1>
      </div>
      </div>
      <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)} className="p-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
        <i className="ri-close-fill text-xl"></i>
      </button>
    </header>
    <div className="users flex flex-col gap-2">
        {project.users && project.users.map(user=>{
          return(
            <div className="userpanel flex gap-2 items-center bg-gray-300 p-2 hover:bg-gray-400 cursor-pointer">
        <div className="user  flex  w-fit h-fit items-center justify-center rounded-full p-3 bg-blue-500 text-white">
          <i className="ri-user-3-fill"></i>
        </div>
        
        <h1 className="flex font-semibold text-lg">{user.email}</h1>
      </div>
          )
        })}
    </div>
  </div>
</section>
            </main>
            {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Select User</h2>
                <button onClick={() => setIsModalOpen(false)} className='p-2'>
                    <i className="ri-close-fill"></i>
                </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                    <div key={user._id} 
                        className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.includes(user._id) ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} 
                        onClick={() => handleUserClick(user._id)}
                    >
                        <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                            <i className="ri-user-fill absolute"></i>
                        </div>
                        <h1 className='font-semibold text-lg'>{user.email}</h1>
                    </div>
                )) : <p className="text-center text-gray-500">No users available</p>}
            </div>
            <button
                onClick={addCollaborators} 
                className='absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                Add Collaborators
            </button>
        </div>
    </div>
)}

            {/*{isModalOpen && (
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
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                        onClick={addCollaborators} 
                        className='absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}*/}
            {/* Collaborator Modal */}
      
        </div>
    );
}
export default Project; 