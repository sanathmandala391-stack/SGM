import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

function AddNotice() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNotice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const facultyToken = localStorage.getItem("facultyToken");

      if (!facultyToken) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/notice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: facultyToken,
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Notice Added Successfully!");
        setTitle("");
        setMessage("");
      } else {
        alert(data.error || "Failed to add notice");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading ? (
        <div className="loaderSection">
    <FadeLoader
                           color="#36d7b7"
                           loading={loading}
                           height={15}
                           width={5}
                           radius={2}
                           margin={2}
                         />
          <p>Your notice is being added...</p>
        </div>
      ) : (
        <form className="tableForm" onSubmit={handleAddNotice}>
          <h3>Add Notice</h3>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the Title"
          />
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your Message"
          />
          <br></br>
          <div className="btnSubmit">
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </div>
          <br></br>
        </form>
      )}
    </div>
  );
}

export default AddNotice;

