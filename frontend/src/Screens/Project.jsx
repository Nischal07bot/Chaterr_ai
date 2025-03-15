import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Project = () => {
    const location=useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Project</h1>
        </div>
    );
}
export default Project; 