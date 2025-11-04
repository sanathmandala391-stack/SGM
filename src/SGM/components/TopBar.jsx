import React from "react";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
function TopBar(){
    return(
        <>
        <marquee>Welcome to SGM GPT 2025</marquee>
        <section className="topbar">
            <div className="collegelogo">
              <Link to="/" className="link"><img src="/SGM-removebg-preview.png" alt="collegeimage"></img></Link>
            </div>
            <div className="collegename">
               <h3>Sanjay Gandhi Memorial Goverment Polytechnic (SGM) GPT</h3>
            </div>
    

        </section>
        </>
    )
}
export default TopBar;


