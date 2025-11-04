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
  const [email, setEmail] = useState("");
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

        setTimetables(await ttRes.json());
        setNotes(await notesRes.json());
        setNotices(await noticeRes.json());
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
      const res = await fetch(`${API_URL}/api/complaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, branch, pinNumber, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Complaint submitted successfully and email sent!");
        setName("");
        setBranch("");
        setPinNumber("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.error || "Failed to submit complaint");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
    } finally {
      setComplaintLoading(false);
    }
  };

  const containerStyle = {
    padding: isMobile ? 10 : 20,
    background: "linear-gradient(120deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
  };
  const inputStyle = {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  };
  const submitBtnStyle = {
    background: "#7e57c2",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  };

  return (
    <>
      <TopBar />
      <Btns onToggle={toggleMenu} />
      <NewMenu isOpen={open} onLogout={logoutHandler} />

      <div style={containerStyle}>
        <h2>📝 Submit Complaint</h2>
        <form onSubmit={handleComplaint} style={{ maxWidth: 500, margin: "auto" }}>
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
          <input
            style={inputStyle}
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>

      <Footer />
    </>
  );
}

export default StudentPortal;
