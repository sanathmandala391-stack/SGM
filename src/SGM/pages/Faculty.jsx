import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Faculty(){
    return(
        <>
        <div className="faculty">
            <div className="facul-head">
                <h2>SGM Faculty Details</h2>
            </div>
            <Link to="/"><button>Home</button></Link>
            <br></br>
        
            <div className="fac">
           <table>
            <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Education</th>
                <th>Work Hours</th>
             <th>Awards</th>
            </tr>
            <tr>
                <td>Mr.Thirumala Sudhakar</td>
                <td>L/DE</td>
                <td>B.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Ravulapenta Ramnarsaiah</td>
                <td>L/C++</td>
                <td>M.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Varalkar Santosh Kumar</td>
                <td>L/COA</td>
                <td>M.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Teneti Naveen Kumar</td>
                <td>L/CN</td>
                <td>MCA</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Anumasu Surender Reddy</td>
                <td>L/AU</td>
                <td>Graduation in Mechanical</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>D.Srinivas</td>
                <td>L/AU</td>
                <td>B.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Subash Reddy</td>
                <td>L/AU</td>
                <td>B.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Mr.Nageshwar Rao</td>
                <td>L/AU</td>
                <td>Graduation in Mechanical</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Smt. Lakkam Radhika</td>
                <td>L/AU</td>
                <td>Graduation in Mechanical</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
               <tr>
                <td>Smt.Syeda Sahar</td>
                <td>L/AA</td>
                <td>B.Arch</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Smt.Kotla Suhasani</td>
                <td>L/AA</td>
                <td>B.Arch</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Smt. Arikanti Udayini</td>
                <td>L/AA</td>
                <td>B.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Mr.Vadukala Varun</td>
                <td>L/AA</td>
                <td>M.Tech</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Smt. Lakshmi Ganti</td>
                <td>L/CCP</td>
                <td>M.Com</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Smt. Bantu Arunim</td>
                <td>L/CCP</td>
                <td>MCA</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
             <tr>
                <td>Smt.Patala Vyduryam</td>
                <td>L/CCP</td>
                <td>M.Com</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
            <tr>
                <td>Mr.V.Dayakar</td>
                <td>L/Physics</td>
                <td>B.Sc in Physics</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
            <tr>
                <td>Mr.Saidulu Ravirala</td>
                <td>L/Chemistry</td>
                <td>B.Sc</td>
                <td>9:30 to 4:30</td>
                <td>None</td>
            </tr>
            <tr>
                <td>Dr.Shankar Mokena</td>
                <td>L/English</td>
                <td>M.A</td>
                <td>9:30 to 4:30</td>
                <td>Ph.D in English</td>
            </tr>
   
           </table>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Faculty;