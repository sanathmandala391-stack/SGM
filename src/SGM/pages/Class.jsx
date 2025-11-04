import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Class(){
    return(
        <>
        <div className="class">
          <div className="class-header">
            <h2>Classrooms at SGMGPT</h2>
          </div>
          <Link to="/" className="link"><button>Home</button></Link>
         <br></br>
         <div className="classroom-Details">
         <h3>Classroom Details</h3>
         <div className="cls">
          <table>
            <tr>
              <th>S.NO</th>
              <th>Room.No</th>
              <th>Condition</th>
              <th>Length</th>
              <th>Width</th>
              <th>Area</th>
            </tr>

            <tr>
           <td>1</td>
           <td>CR</td>
           <td>Good</td>
           <td>9</td>
           <td>9.2</td>
           <td>65.6</td>
            </tr>
            <tr>
            <td>2</td>
            <td>LH</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>3</td>
            <td>LH1</td>
            <td>Good</td>
            <td>8</td>
            <td>6.3</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>4</td>
            <td>LH2</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>5</td>
            <td>LH3</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>6</td>
            <td>LH4</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>7</td>
            <td>LH5</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>8</td>
            <td>LH6</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>9</td>
            <td>LH7</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
                        <tr>
            <td>10</td>
            <td>LH8</td>
            <td>Good</td>
            <td>6</td>
            <td>6.34</td>
            <td>35.08</td>
            </tr>
          </table>
         </div>
         </div>
         <br></br>
         <div className="drawing-class">
         <h3>Drawing Hall Details</h3>
         <table>
          <tr>
            <th>S.NO</th>
            <th>Room.NO</th>
            <th>Condition</th>
            <th>Length</th>
            <th>Width</th>
            <th>Area</th>
          </tr>
          <tr>
            <td>1</td>
            <td>DH1</td>
            <td>Good</td>
            <td>12</td>
            <td>11</td>
            <td>132</td>
          </tr>
          <tr>
            <td>2</td>
            <td>DH2</td>
            <td>Good</td>
            <td>12</td>
            <td>11</td>
            <td>132</td>
          </tr>
          <tr>
            <td>3</td>
            <td>DH3</td>
            <td>Good</td>
            <td>12</td>
            <td>11</td>
            <td>132</td>
          </tr>
         </table>
         </div>
         <br></br>
         <div className="staff">
        <h3>Staff/Office Details</h3>
        <table>
          <tr>
            <th>S.NO</th>
            <th>Type of Room</th>
            <th>Room.No</th>
            <th>Condition</th>
            <th>Length</th>
            <th>Width</th>
            <th>Area</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Staff Room</td>
            <td>SR</td>
            <td>Good</td>
            <td>4</td>
            <td>4.5</td>
            <td>18.0</td>
          </tr>
            <tr>
            <td>2</td>
            <td>Principal Room</td>
            <td>PR</td>
            <td>Good</td>
            <td>6</td>
            <td>6.9</td>
            <td>36.5</td>
          </tr>
            <tr>
            <td>3</td>
            <td>Principal Room</td>
            <td>0R</td>
            <td>Good</td>
            <td>7</td>
            <td>7.5</td>
            <td>49.7</td>
          </tr>
        </table>
         </div>
         <div className="workshop">
            <h3>Workshop Details</h3>
            <table>
              <tr>
                <th>S.NO</th>
                <th>Type of Workshop</th>
                <th>Workshop.NO</th>
                <th>Structure</th>
                <th>Condition</th>
                <th>Length</th>
                <th>Width</th>
                <th>Area</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Mechanical</td>
                <td>Automobile</td>
                <td>RRC</td>
                <td>Good</td>
                <td>10</td>
                <td>8</td>
                <td>80</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Mechanical</td>
                <td>Machince</td>
                <td>RRC</td>
                <td>Good</td>
                <td>10</td>
                <td>8</td>
                <td>80</td>
              </tr>
            </table>
         </div>
        </div>
        
        <Footer/>
        </>
    )
}

export default Class;