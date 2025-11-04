import React from "react";

function Buttons({ onToggle,onScrollHome,onScrollAbout,onScrollContact}) {
  return (
    <div className="buttons">
      <button onClick={onScrollHome}>Home</button>
      <button onClick={onScrollAbout}>About Us</button>
      <button onClick={onScrollContact}>Contact Us</button>
      <button id="side-bar" onClick={onToggle}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
}

export default Buttons;