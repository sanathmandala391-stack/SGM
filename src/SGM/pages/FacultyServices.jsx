
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Facbuttons from "../components/Facbuttons";
import FacMenu from "../components/FacMenu";
import AddTimetable from "../components/forms/AddTimetable";
import AddNotes from "../components/forms/AddNotes";
import AddNotice from "../components/forms/AddNotice";
import Footer from "../components/Footer";


const MOBILE_BREAKPOINT = 768;

function FacultyServices() {
    const navigate = useNavigate();
    const [showTimetable, setShowTimetable] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showNotice, setShowNotice] = useState(false);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT); 

    const toggleMenu = () => setOpen(!open);

  
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const showTimetableHandler = () => {
        const token = localStorage.getItem("facultyToken");
        if (token) {
            setShowTimetable(true);
            setShowNotes(false);
            setShowNotice(false);
        } else {
            alert("Login to Continue");
        }
    };

    const showNotesHandler = () => {
        const token = localStorage.getItem("facultyToken");
        if (token) {
            setShowNotes(true);
            setShowTimetable(false);
            setShowNotice(false);
        } else {
            alert("Login to Continue");
        }
    };

    const showNoticeHandler = () => {
        const token = localStorage.getItem("facultyToken");
        if (token) {
            setShowNotice(true);
            setShowNotes(false);
            setShowTimetable(false);
        } else {
            alert("Login to Continue");
        }
    };

    const logoutHandler = () => {
        const confirmLogout = window.confirm("Are You Sure You Want To LogOut");
        if (confirmLogout) {
            localStorage.removeItem("loginToken");
            navigate("/facultyregister");
        }
    };

    const pageStyle = {
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, #a8edea, #fed6e3)",
        minHeight: "100vh",
        padding: isMobile ? "20px 10px" : "40px 20px", 
        textAlign: "center",
    };

    const headerStyle = {
        color: "#4a148c",
        marginBottom: isMobile ? "20px" : "30px", 
    };

   

    const formContainerStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "15px" : "30px", 
        padding: isMobile ? "0 10px" : "0", 
    };

    return (
        <div style={pageStyle}>
            <TopBar />
            <Facbuttons onToggle={toggleMenu} />
            <FacMenu
                isOpen={open}
                onLogout={logoutHandler}
                showTimetableHandler={showTimetableHandler}
                showNotesHandler={showNotesHandler}
                showNoticeHandler={showNoticeHandler}
            />
          

            <div style={headerStyle}>
                <h2 style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
                    Welcome to SGM Faculty Services
                </h2>
                <p style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Manage Timetables, Notes & Notices easily
                </p>
            </div>

            <div style={formContainerStyle}>
                {showTimetable && <AddTimetable isMobile={isMobile} />}
                {showNotes && <AddNotes isMobile={isMobile} />}
                {showNotice && <AddNotice isMobile={isMobile} />}
            </div>
              <Footer/>
        </div>
       

    );
    
}

export default FacultyServices;