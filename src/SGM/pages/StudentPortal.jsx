

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

  // Complaint states
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [complaintLoading, setComplaintLoading] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("loginToken");
      navigate("/login");
    }
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [ttRes, notesRes, noticeRes] = await Promise.all([
          fetch(`${API_URL}/api/timetable/gettimetable`),
          fetch(`${API_URL}/api/getnotes`),
          fetch(`${API_URL}/api/getnotice`),
        ]);

        const ttData = await ttRes.json();
        const notesData = await notesRes.json();
        const noticeData = await noticeRes.json();

        setTimetables(Array.isArray(ttData) ? ttData : []);
        setNotes(Array.isArray(notesData) ? notesData : []);
        setNotices(Array.isArray(noticeData) ? noticeData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================= COMPLAINT =================
  const handleComplaint = async (e) => {
    e.preventDefault();
    setComplaintLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/complaint/complaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, branch, pinNumber, email, message }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Complaint submitted successfully!");
        setName("");
        setBranch("");
        setPinNumber("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.message || "Failed to submit complaint");
      }
    } catch (err) {
      alert("Error submitting complaint");
    } finally {
      setComplaintLoading(false);
    }
  };

  // ================= STYLES =================
  const containerStyle = {
    padding: isMobile ? 10 : 20,
    fontFamily: "Segoe UI, sans-serif",
    background: "linear-gradient(120deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
  };

  const sectionStyle = { marginBottom: isMobile ? 30 : 50 };
  const cardsContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: isMobile ? 15 : 20,
    justifyContent: "center",
  };

  const card = {
    background: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: isMobile ? 15 : 20,
    width: isMobile ? "90%" : 250,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    background: "#7e57c2",
    color: "#fff",
    padding: "10px 0",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: isMobile ? "1.5rem" : "2rem",
  };

  const downloadBtn = {
    display: "inline-block",
    marginTop: 10,
    padding: "8px 12px",
    background: "#7e57c2",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        Loading student data...
      </p>
    );

  return (
    <>
      <TopBar />
      <Btns onToggle={toggleMenu} />
      <NewMenu isOpen={open} onLogout={logoutHandler} />

      <div style={containerStyle}>
        {/* ================= NOTES ================= */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>📚 Notes</h2>

          <div style={cardsContainer}>
            {notes.length === 0 ? (
              <p>No notes available.</p>
            ) : (
              notes.map((n) => {
                const fileUrl = `data:${n.fileType};base64,${n.fileData}`;

                return (
                  <div key={n._id} style={card}>
                    <h3>{n.subject}</h3>
                    <p>
                      <strong>Semester:</strong> {n.semester}
                    </p>

                    <a
                      href={fileUrl}
                      download={n.fileName}
                      target="_blank"
                      rel="noreferrer"
                      style={downloadBtn}
                    >
                      Download
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default StudentPortal;
