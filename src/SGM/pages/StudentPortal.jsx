/*

import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Btns from "../components/Btns";
import NewMenu from "../components/NewMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { FadeLoader } from "react-spinners";

function StudentPortal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const [timetables, setTimetables] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [message, setMessage] = useState("");
  const [complaintLoading, setComplaintLoading] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const logoutHandler = () => {
    if (window.confirm("Are You Sure You Want To LogOut")) {
      localStorage.removeItem("loginToken");
      navigate("/login");
    }
  };

 
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [ttRes, notesRes, noticeRes] = await Promise.all([
          fetch(`${API_URL}/api/gettimetable`),
          fetch(`${API_URL}/api/getnotes`),
          fetch(`${API_URL}/api/getnotice`),
        ]);

        const ttData = await ttRes.json();
        const notesData = await notesRes.json();
        const noticeData = await noticeRes.json();

        setTimetables(ttData);
        setNotes(notesData);
        setNotices(noticeData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleComplaint = async (e) => {
    e.preventDefault();
    setComplaintLoading(true);
    try {
      const token = localStorage.getItem("loginToken");
      const res = await fetch(`${API_URL}/api/complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ name, branch, pinNumber, message }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Complaint Added Successfully");
        setName("");
        setBranch("");
        setPinNumber("");
        setMessage("");
      } else {
        alert(data.error || "Failed to submit complaint");
      }
    } catch (err) {
      console.error("Failed to add complaint", err);
    } finally {
      setComplaintLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>Loading faculty data...</p>;


  const containerStyle = {
    padding: 20,
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
   // backgroundImage:"url('/stu.png')",
    //backgroundSize: "cover"


  };

  const headerStyle = { textAlign: "center", marginBottom: 40 };

  const sectionStyle = { marginBottom: 50 };

  const cardsContainer = { display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" };

  const card = {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 20,
    width: 250,
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const cardImage = { width: "100%", borderRadius: 8, marginTop: 10 };

  const downloadBtn = {
    display: "inline-block",
    marginTop: 10,
    padding: "8px 12px",
    background: "#7e57c2",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    transition: "background 0.3s",
  };

  const noticeCard = { ...card, background: "#ffecb3" };

  const headingStyle = {
    textAlign: "center",
    background: "#7e57c2",
    color: "#fff",
    padding: "10px 0",
    borderRadius: 8,
    marginBottom: 20,
  };

  const formStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 12,
    maxWidth: 500,
    margin: "0 auto 50px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
  };

  const submitBtnStyle = {
    padding: "10px 20px",
    background: "#7e57c2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  };

  return (
    <>
      <TopBar />
      <Btns onToggle={toggleMenu} />
      <NewMenu isOpen={open} onLogout={logoutHandler} />

      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>🎓 Student Portal</h1>
          <p>Your central hub for timetables, notes, notices, and complaints.</p>
        </header>

       
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📝 Submit Complaint</h2>
          <form style={formStyle} onSubmit={handleComplaint}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Pin Number"
              value={pinNumber}
              onChange={(e) => setPinNumber(e.target.value)}
              required
            />
            <textarea
              style={inputStyle}
              placeholder="Enter Your Complaint"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button style={submitBtnStyle} type="submit" disabled={complaintLoading}>
              {complaintLoading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>📅 Timetables</h2>
          <div style={cardsContainer}>
            {timetables.length === 0 ? (
              <p>No timetables available.</p>
            ) : (
              timetables.map((t) => (
                <div key={t._id} style={card}>
                  <h3>{t.semester}</h3>
                  <img src={`${API_URL}/uploads/${t.image}`} alt={`Timetable ${t.semester}`} style={cardImage} />
                </div>
              ))
            )}
          </div>
        </section>

 
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📚 Notes</h2>
          <div style={cardsContainer}>
            {notes.length === 0 ? (
              <p>No notes available.</p>
            ) : (
              notes.map((n) => (
                <div key={n._id} style={card}>
                  <h3>{n.subject}</h3>
                  <p><strong>Branch:</strong> {n.branch}</p>
                  <p><strong>Semester:</strong> {n.semester}</p>
                  <a href={`${API_URL}/uploads/${n.file}`} target="_blank" rel="noopener noreferrer" style={downloadBtn}>
                    Download
                  </a>
                </div>
              ))
            )}
          </div>
        </section>

        
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📰 Notices</h2>
          <div style={cardsContainer}>
            {notices.length === 0 ? (
              <p>No notices available.</p>
            ) : (
              notices.map((n) => (
                <div key={n._id} style={noticeCard}>
                  <h3>{n.title}</h3>
                  <p>{n.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default StudentPortal;
*/

import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Btns from "../components/Btns";
import NewMenu from "../components/NewMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { FadeLoader } from "react-spinners";

// Define the mobile breakpoint
const MOBILE_BREAKPOINT = 768;

function StudentPortal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  const [timetables, setTimetables] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [message, setMessage] = useState("");
  const [complaintLoading, setComplaintLoading] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const logoutHandler = () => {
    if (window.confirm("Are You Sure You Want To LogOut")) {
      localStorage.removeItem("loginToken");
      navigate("/login");
    }
  };

  // Effect for fetching data (no change needed here)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [ttRes, notesRes, noticeRes] = await Promise.all([
          fetch(`${API_URL}/api/gettimetable`),
          fetch(`${API_URL}/api/getnotes`),
          fetch(`${API_URL}/api/getnotice`),
        ]);

        const ttData = await ttRes.json();
        const notesData = await notesRes.json();
        const noticeData = await noticeRes.json();

        setTimetables(ttData);
        setNotes(notesData);
        setNotices(noticeData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Effect for handling window resize to detect mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleComplaint = async (e) => {
    e.preventDefault();
    setComplaintLoading(true);
    try {
      const token = localStorage.getItem("loginToken");
      const res = await fetch(`${API_URL}/api/complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ name, branch, pinNumber, message }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Complaint Added Successfully");
        setName("");
        setBranch("");
        setPinNumber("");
        setMessage("");
      } else {
        alert(data.error || "Failed to submit complaint");
      }
    } catch (err) {
      console.error("Failed to add complaint", err);
    } finally {
      setComplaintLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>Loading faculty data...</p>;

  // --- Inline Styles (Adjusted for Mobile) ---

  const containerStyle = {
    padding: isMobile ? 10 : 20, // Reduced padding on mobile
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: isMobile ? 20 : 40, // Reduced margin on mobile
  };

  const sectionStyle = { marginBottom: isMobile ? 30 : 50 };

  const cardsContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: isMobile ? 15 : 20, // Reduced gap on mobile
    justifyContent: "center",
  };

  const card = {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: isMobile ? 15 : 20, // Reduced padding on mobile
    width: isMobile ? "90%" : 250, // Full width on mobile, fixed width on desktop
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Lighter shadow on mobile
    transition: "transform 0.3s, box-shadow 0.3s",
    boxSizing: "border-box", // Ensure padding is included in the width
  };

  const cardImage = { width: "100%", borderRadius: 8, marginTop: 10 };

  const downloadBtn = {
    display: "inline-block",
    marginTop: 10,
    padding: isMobile ? "6px 10px" : "8px 12px", // Smaller button padding on mobile
    background: "#7e57c2",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: isMobile ? 14 : 16, // Smaller font on mobile
    transition: "background 0.3s",
  };

  const noticeCard = { ...card, background: "#ffecb3" };

  const headingStyle = {
    textAlign: "center",
    background: "#7e57c2",
    color: "#fff",
    padding: isMobile ? "8px 0" : "10px 0", // Smaller padding on mobile
    borderRadius: 8,
    marginBottom: isMobile ? 15 : 20,
    fontSize: isMobile ? "1.5rem" : "2rem", // Smaller font size on mobile
  };

  const formStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    padding: isMobile ? 20 : 30, // Reduced padding on mobile
    borderRadius: 12,
    maxWidth: isMobile ? "95%" : 500, // Near full width on mobile
    margin: "0 auto 30px", // Reduced margin on mobile
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Lighter shadow on mobile
  };

  const inputStyle = {
    width: "100%",
    padding: isMobile ? 8 : 10, // Reduced padding on mobile
    marginBottom: isMobile ? 10 : 15, // Reduced margin on mobile
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: isMobile ? 14 : 16, // Smaller font on mobile
    boxSizing: "border-box", // Essential for full-width inputs
  };

  const submitBtnStyle = {
    padding: isMobile ? "8px 15px" : "10px 20px", // Reduced padding on mobile
    background: "#7e57c2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: isMobile ? 14 : 16, // Smaller font on mobile
    width: isMobile ? "100%" : "auto", // Full width button on mobile
  };

  return (
    <>
      <TopBar />
      <Btns onToggle={toggleMenu} />
      <NewMenu isOpen={open} onLogout={logoutHandler} />

      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>🎓 Student Portal</h1>
          <p style={{ fontSize: isMobile ? 14 : 16 }}>
            Your central hub for timetables, notes, notices, and complaints.
          </p>
        </header>

        {/* ... Rest of the sections using the responsive styles ... */}
        {/* Submit Complaint Section */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📝 Submit Complaint</h2>
          <form style={formStyle} onSubmit={handleComplaint}>
            {/* Input fields using inputStyle */}
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {/* ... other input fields ... */}
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Enter Your Pin Number"
              value={pinNumber}
              onChange={(e) => setPinNumber(e.target.value)}
              required
            />
            <textarea
              style={{ ...inputStyle, minHeight: isMobile ? 80 : 100 }} // Smaller textarea on mobile
              placeholder="Enter Your Complaint"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button style={submitBtnStyle} type="submit" disabled={complaintLoading}>
              {complaintLoading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </section>

        {/* Timetables Section */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📅 Timetables</h2>
          <div style={cardsContainer}>
            {timetables.length === 0 ? (
              <p>No timetables available.</p>
            ) : (
              timetables.map((t) => (
                <div key={t._id} style={card}>
                  <h3>{t.semester}</h3>
                  {/* Assuming image is responsive by default */}
                  <img src={`${API_URL}/uploads/${t.image}`} alt={`Timetable ${t.semester}`} style={cardImage} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Notes Section */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📚 Notes</h2>
          <div style={cardsContainer}>
            {notes.length === 0 ? (
              <p>No notes available.</p>
            ) : (
              notes.map((n) => (
                <div key={n._id} style={card}>
                  <h3>{n.subject}</h3>
                  <p style={{ fontSize: isMobile ? 14 : 16 }}>
                    <strong>Branch:</strong> {n.branch}
                  </p>
                  <p style={{ fontSize: isMobile ? 14 : 16 }}>
                    <strong>Semester:</strong> {n.semester}
                  </p>
                  <a
                    href={`${API_URL}/uploads/${n.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={downloadBtn}
                  >
                    Download
                  </a>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Notices Section */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📰 Notices</h2>
          <div style={cardsContainer}>
            {notices.length === 0 ? (
              <p>No notices available.</p>
            ) : (
              notices.map((n) => (
                <div key={n._id} style={noticeCard}>
                  <h3 style={{ fontSize: isMobile ? 16 : 18 }}>{n.title}</h3>
                  <p style={{ fontSize: isMobile ? 14 : 16 }}>{n.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default StudentPortal;
