import React, { useEffect, useState } from "react";

function Footer() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    fetch("https://api.visitorapi.net/api/visitors?domain=sgmgpt.netlify.app")
      .then(res => res.json())
      .then(data => {
        setVisitCount(data.visitors_total || 0);
      })
      .catch(err => console.error("VisitorAPI error:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
      👀 Visitors: {visitCount}
      <br />©2025 - Computer Science and Engineering
    </div>
  );
}

export default Footer;
