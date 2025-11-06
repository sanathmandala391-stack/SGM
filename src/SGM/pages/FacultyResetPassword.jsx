import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../data/apiPath";


const StudentForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/forgot-password/student`, { email });
      setMsg(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
      setMsg("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-xl w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-4">Student Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 w-full rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
        {msg && <p className="text-green-600 mt-3">{msg}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default StudentForgotPassword;
