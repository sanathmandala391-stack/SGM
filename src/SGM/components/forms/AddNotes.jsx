 import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

 function AddNotes(){
    const [subject,setSubject]=useState("");
    const [file,setFile]=useState(null);
    const [semester,setSemester]=useState("");
    const [branch,setBranch]=useState("");
    const [loading,setLoading]=useState(false);
  
    const handleFileUpload=(e)=>{
        const file=e.target.files[0];
        setFile(file)
    }
    const handleNotes=async(e)=>{
        e.preventDefault();
      setLoading(true);

      try{
   const facultyToken=localStorage.getItem('facultyToken');
   if(!facultyToken){
    console.log("Faculty Not Authenticated");
   }
   const formData=new FormData();
   formData.append("subject",subject);
  formData.append("branch",branch)
   formData.append("semester",semester);
      formData.append("file",file);

   const response=await fetch(`${API_URL}/api/notes`,{
    method:"POST",
    headers:{
        'token':`${facultyToken}`
    },
    body: formData
   });
   const data= await response.json();
   if(response.ok){
    alert("Notes Added Sucessfully");
    console.log(data);
    setSubject("");
       setBranch("");
    setSemester("");
    setFile(null);
   }
      }
      catch(err){
   console.log("Failed To Add Notes")
      }
      finally{
        setLoading(false);
      }
    
    }
    return(

        
   <div className="firmSection">

    {loading && <div className="loaderSection">
       <FadeLoader
                              color="#36d7b7"
                              loading={loading}
                              height={15}
                              width={5}
                              radius={2}
                              margin={2}
                            />
                  <p>Your Notes Was Adding..</p>
                  </div> 
}

{!loading &&<form className="tableForm" onSubmit={handleNotes}>
<h3>Add Notes</h3>
<label>Subject</label>
<input type="text" name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Enter the Subject"></input>
<input type="text" name="branch" value={branch} onChange={(e)=>setBranch(e.target.value)} placeholder="Enter the Branch"></input>
<label>Semester</label>
<input type="text" name="semester" value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="Enter the Semester"></input>
<label>File</label>
<input type="file" onChange={handleFileUpload}></input>
<br></br>
<div className="btnSubmit">
    <button type="submit">Submit</button>
</div>
<br></br>
</form>}
   </div>

        
    )
 }

 export default AddNotes;