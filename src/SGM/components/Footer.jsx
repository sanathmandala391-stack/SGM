import React, { useEffect, useState } from "react";

function Footer() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const namespace = "mycollegeportal";
    const key = "lifetime_visits";


    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => {
        setVisitCount(data.value);
      })
      .catch(err => console.error("CountAPI error:", err));
  }, []);

  return (
    <div className="footer" style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
      👀 Visitors: {visitCount} <br />
      ©2025 - Computer Science and Engineering
    </div>
  );
}

export default Footer;
