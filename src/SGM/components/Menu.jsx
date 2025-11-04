

import React from "react";
import {Link} from "react-router-dom";

function Menu({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-menu">
        <ul>
         <Link to="/courses" className="link"><li>Courses</li></Link>
         <Link to="/classes" className="link"><li>Class Rooms</li></Link>
          <Link to="/labs" className="link"><li>Labs</li></Link>
          <Link to="/facilities" className="link"><li>Facilities</li></Link>
           <Link to="/faculty" className="link"><li>Faculty Details</li></Link>
           <Link to="/studentPortal" className="link"><li>Student Portal</li></Link>
          <Link to="/allLogin" className="link"><li>Login</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default Menu;