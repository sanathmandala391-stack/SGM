import React, { useEffect, useState } from "react";

function Footer() {
  const [visitCount, setVisitCount] = useState(0);
useEffect(() => {
  const namespace = "mycollegeportal";
  const key = "lifetime_visits";
  const url = `https://api.counterapi.dev/hit/${namespace}/${key}`;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      const parsed = JSON.parse(data.contents);
      setVisitCount(parsed.value);
    })
    .catch(err => console.error("CounterAPI error:", err));
}, []);



  return (
    <div className="footer" style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
      👀 Visitors: {visitCount} <br />
      ©2025 - Computer Science and Engineering
    </div>
  );
}

export default Footer;
