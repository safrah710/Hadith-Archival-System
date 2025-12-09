import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Oval } from 'react-loader-spinner';
import "../CSS/Login.css";

const ChangePassword = () => {
  const location = useLocation();
  const { otp, email } = location.state || {};

  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (enteredOtp !== otp) {
        toast.error("Incorrect OTP");
        return;
      }
      if (password !== confirmPass) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await axios.post("https://hadith-archival-system-1.onrender.com/user/change", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully");
        navigate("/");
      }

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Oval height={80} width={80} color="#056903ff" visible />
        </div>
      )}

      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleChange}>
          <h2 className="login-heading">Change Password</h2>

          <input
            type="text"
            className="login-field"
            placeholder="Enter OTP"
            onChange={(e) => setEnteredOtp(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-field"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-field"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />

          <button className="login-green-btn" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
