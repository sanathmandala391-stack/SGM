import React from "react";
import {Link} from "react-router-dom"
import Footer from "../components/Footer";
function Courses(){
    
    return(
        <>
        <div className="courses">
  <div className="head">
    <h2>Courses Offered By SGM</h2>
  </div>
  <div className="course">
    <div className="cse">
        <h4>Computer Science</h4>
       
    
    </div>
    <div className="cse">
 <h4>Commercial Practice</h4>
 
    </div>
    <div className="cse">
       <h4>Automobile</h4>
    </div>
    <div className="cse">
<h4>Architecture</h4>

    </div>
  </div>
  <br></br>
            <Link to="/"><button>Go Home</button></Link>
        </div>
        <br></br>
        <br></br>
        <Footer/>
        </>
    )
}
export default Courses;