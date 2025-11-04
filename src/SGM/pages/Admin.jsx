import React from "react";

function Admin(){
    const adminName = localStorage.getItem("admin");
    return(
        <>
        
        <div className="adminSection">
        <h2>Welcome to the Admin Section.</h2>
         <h4 style={{ margin: "8px 0 0 0" }}>Welcome Mr.{adminName}</h4>
        </div>

        </>
    )
}

export default Admin;