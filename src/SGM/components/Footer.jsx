import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

function Footer() {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const res = await fetch(`${API_URL}/api/visitor-count`);
        const data = await res.json();
        setVisitCount(data.count);
      } catch (err) {
        console.error("Visitor API error:", err);
        setVisitCount("N/A");
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
      👀 Visitors: {visitCount === null ? "Loading..." : visitCount} <br />
      ©2025 - Computer Science and Engineering
    </div>
  );
}

export default Footer;
