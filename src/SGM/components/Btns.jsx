import React from "react";

function Btns({onToggle}){

    return(
        
         <div className="buttons">
      <button >Home</button>
      <button>About Us</button>
      <button>Contact Us</button>
      <button id="side-bar" onClick={onToggle}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
    
    )
};

export default Btns;