import React from "react";
import { Link } from "react-router-dom";

function AllLogin({FacultyRegister}){
    return(
        <>
        <div className="log">
            <div className="lec">
         <Link to="/facultyregister" className="link"><button>Faculty Login</button></Link>
            </div>
            <br></br>
            <div className="admin">
       <Link to="/admin" className="link"><button>Admin Login</button></Link>
            </div>

        </div>
        </>
    )
}

export default AllLogin;