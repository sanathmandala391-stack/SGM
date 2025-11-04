import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Lab(){
    return(
        <>
        <div className="lab">
     <div className="lab-head">
        <h2>Labs at SGM</h2>
     </div>
     <Link to="/"><button>Home</button></Link>
     <div className="grid">
     <div className="cs">
        <h2>Architecture Labs</h2>
        <br></br>
        <div className="cad">
            <h3>Cad Lab</h3>
        </div>
        <div className="survey">
            <h3>Survey Lab</h3>
        </div>

     </div>
<div className="cs">
    <h2>Automobile Labs</h2>
<div className="cad">
<h3>Machine Lab</h3>
</div>
<div className="survey">
    <h3>Cad Lab</h3>
</div>
</div>
<div className="cp">
<h2>Commercial Labs</h2>
<div className="cad">
    <h3>Computer Lab</h3>
</div>
<div className="survey">
    <h3>Typing Lab</h3>
</div>
</div>
<div className="common">
<h2>Commom Labs</h2>
<div className="eng">
  <h3>English Lab</h3>  
</div>
<div className="phy">
    <h3>Physics Lab</h3>
</div>
<div className="che">
    <h3>Chemistry Lab</h3>
</div>
</div>
<div className="science">
    <h2>Computer Labs</h2>
    <div className="hard">
       <h3>Hardware Lab</h3> 
    </div>
    <div className="comp">
        <h3>Computer Lab</h3>
    </div>
    <div className="modrob">
        <h3>Modrobs Lab</h3>
    </div>
    <div className="de">
        <h3>DE & MP Lab</h3>
    </div>
    <div className="sdc">
        <h3>SDC Lab</h3>
    </div>

</div>
</div>
        </div>
       <Footer/> 
        </>
    )
}

export default Lab;