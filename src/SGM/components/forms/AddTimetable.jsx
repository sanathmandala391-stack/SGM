/* import React, { useState } from  "react"
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";
 

 function AddTimetable(){
    const [semester,setSemester]=useState("");
    const [image,setImage]=useState(null);
    const [loading,setLoading]=useState(false);

 const handleImageupload=(e)=>{
    const selectedImage=e.target.files[0];
    setImage(selectedImage);
 }
    const handleAddtimetable=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
        const loginToken=localStorage.getItem('loginToken');
        if(!loginToken){
            alert("Pease Login To continue..");
            console.log("User Not Authienticated");
        }

        const formData= new FormData();
        formData.append("semester",semester);
        formData.append("image",image);

        const response=await fetch(`${API_URL}/api/timetable`,{
           method:"POST",
           headers:{
            'token':`${loginToken}`
           },
         body: formData
        })
        const data= await response.json();
        if(response.ok){
            console.log(data);  
        setSemester("");
        setImage(null);
        alert("Timetable Added Sucessfully");
        }
        }catch(err){
            console.log("Error Failed To Add Timetable");
        }
        finally{
            setLoading(false);
        }

    }
    return(
        
        <div className="firmSection">
            {
                loading && <div className="loaderSection">
                     <FadeLoader
                           color="#36d7b7"
                           loading={loading}
                           height={15}
                           width={5}
                           radius={2}
                           margin={2}
                         />
                  <p>Your Timetable Was Adding..</p>
                  </div> 
            }
    {!loading &&    <form className="tableForm" onSubmit={handleAddtimetable}>
        <h3>Add Timetable</h3>
        <label>Choose the Semseter</label>
        <input type="text" name="semester" value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="Enter the Semeter"></input><br>
        </br>
        <label>Image</label>
        <input type="file" onChange={handleImageupload}></input>
        <br>
        </br>

        <div className="btnSubmit">
            <button type="submit">Submit</button>
        </div>
        <br></br>
        </form>}
        </div>
        
    )
 }
 export default AddTimetable;

*/
/*

import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

function AddTimetable() {
    const [semester, setSemester] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageupload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddtimetable = async (e) => {
        e.preventDefault();
        
        // 1. Retrieve token
        const loginToken = localStorage.getItem('loginToken');
        
        // 2. Critical Check
        if (!loginToken || loginToken === "undefined") {
            alert("Please Login To continue..");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("semester", semester);
            formData.append("image", image);

            const response = await fetch(`${API_URL}/api/timetable`, {
                method: "POST",
                headers: {
                    'token': loginToken // This MUST match req.headers.token in backend
                },
                body: formData 
            });

            const data = await response.json();

            if (response.ok) {
                alert("Timetable Added Successfully");
                setSemester("");
                setImage(null);
                e.target.reset(); 
            } else {
                alert(data.error || data.message || "Failed to add timetable");
            }
        } catch (err) {
            console.error("Frontend Error:", err);
            alert("Connection error. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="firmSection">
            {loading ? (
                <div className="loaderSection">
                    <FadeLoader color="#36d7b7" />
                    <p>Processing...</p>
                </div>
            ) : (
                <form className="tableForm" onSubmit={handleAddtimetable}>
                    <h3>Add Timetable</h3>
                    <label>Semester</label>
                    <input 
                        type="text" 
                        value={semester} 
                        onChange={(e) => setSemester(e.target.value)} 
                        placeholder="e.g. 1st Semester" 
                        required 
                    />
                    <label>Upload Image</label>
                    <input type="file" onChange={handleImageupload} required />
                    <div className="btnSubmit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AddTimetable;
*/

import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

function AddTimetable() {
    const [semester, setSemester] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddtimetable = async (e) => {
        e.preventDefault();
        const loginToken = localStorage.getItem('loginToken');
        
        if (!loginToken) {
            alert("Please Login To continue..");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("semester", semester);
        formData.append("image", image);

        try {
            const response = await fetch(`${API_URL}/api/timetable/add-timetable`, {
                method: "POST",
                headers: { 'token': loginToken },
                body: formData 
            });

            if (response.ok) {
                alert("Timetable Added Successfully");
                setSemester("");
                setImage(null);
                e.target.reset();
            } else {
                alert("Failed to add timetable");
            }
        } catch (err) {
            alert("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            {loading ? <FadeLoader color="#36d7b7" /> : (
                <form onSubmit={handleAddtimetable}>
                    <h3>Add Timetable</h3>
                    <input type="text" placeholder="Semester" value={semester} 
                           onChange={(e) => setSemester(e.target.value)} required />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default AddTimetable;
