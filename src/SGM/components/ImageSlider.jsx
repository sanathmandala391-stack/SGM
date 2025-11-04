import React, { useState,useEffect} from "react";

const images=[
"/image94.jpeg",
"/image95.jpeg",
"/image96.jpeg",
"/image97.jpeg",
"/image98.jpeg",
"/image99.jpeg"

]
function ImageSlider(){
const [currentIndex,setCurrentIndex]=useState(0);

useEffect(()=>{
const interval=setInterval(()=>{
setCurrentIndex((prevIndex)=>prevIndex===images.length-1?0:prevIndex+1);
},2000);
return()=>clearInterval(interval);
},[]);

return(
    <>
    <div className="images">
        <img src={images[currentIndex]} className="fade-image"></img>
    </div>
    </>
)
};
export default ImageSlider;