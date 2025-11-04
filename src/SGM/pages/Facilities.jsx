import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Facilities(){
    return(

        <>
        <div className="facil">
                   <div className="facil-head">
                <h2> SGM College Facilites</h2>
            </div>
            <br></br>
           <Link to="/"><button>Home</button></Link>
            <br></br><br></br>
            <div className="div">
         
         <div className="toilet">
                <h2>Toilets</h2>
                <div className="toilet-table">
  <table>
                    <tr>
                        <td>Staff Toilets:</td>
                        <td>Present</td>
                    </tr>
                    <tr>
                        <td>Student Toilets:</td>
                        <td>Present</td>
                    </tr>
                    <tr>
                        <td>Condition of Toilet:</td>
                        <td>Not Specified</td>
                    </tr>
                    <tr>
                        <td>Toilets Maintained By:</td>
                        <td>Owned By College</td>
                    </tr>
                </table>
                </div>
              
            </div>
            </div>
     
            <br></br>
            <br></br>
            
            <div className="divi">
           <div className="lib">
                <h2>Library</h2>
                <div className="lib-details">
              <table> 
                    <tr>
                   <th>S.No</th>
                   <th>Course</th>
                   <th>Number of Books</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Computer Science Engineering</td>
                        <td>2828</td>
                    </tr>
                     <tr>
                        <td>2</td>
                        <td>Automobile Enginering</td>
                        <td>3790</td>
                    </tr>
                     <tr>
                        <td>3</td>
                        <td>Architectural Assistantship</td>
                        <td>4548</td>
                    </tr>
                     <tr>
                        <td>4</td>
                        <td>Commercial and Computer Practice</td>
                        <td>3996</td>
                    </tr>
                </table>
                </div>
            </div>
            </div>
            <br></br>
            <br></br>
            <div className="division">
        <div className="water">
            <h2>Water Supply</h2>
            <div className="water-details">
                <table>
                    <tr>
                        <td>Nature of Water Facilty:</td>
                        <td>Bore Water</td>
                    </tr>
                    <tr>
                    <td>Types of Water Storage:</td>
                    <td>Underground Water Pump</td>
                    </tr>
                    <tr>
                        <td>Drinking Water Supply:</td>
                        <td>Intermittent</td>
                    </tr>
                    <tr>
                        <td>R.O. Plant:</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Toilets:</td>
                        <td>Intermittent</td>
                    </tr>
                </table>
            </div>
        </div>
            </div>
            <br></br>
            <br></br>
           <div className="sick">
            <div className="room">
            <h2>Sports</h2>
            <div className="sports">
                <table>
                    <tr>
                        <td>Outdoor Play Grounds & Courts:</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Indoor Games Facilities:</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Sports Conducted Yearly:</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>P.D. Room Size:</td>
                        <td>5m x 4m</td>
                    </tr>
                    <tr>
                        <td>Sports & Games Material</td>
                        <td>Yes</td>
                    </tr>
                </table>
            </div>
           </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}


export default Facilities;