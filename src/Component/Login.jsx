import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import "../CSS/Login.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post("https://hadith-archival-system-1.onrender.com/user/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login successful");
        sessionStorage.setItem("name", res.data.name);
        navigate("/Dashboard");
      } else if (res.status === 402) {
        toast.error("Password Wrong");
      } else if (res.status === 401) {
        toast.error("No user Found");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
    {loading ? (
  <div className="loader-overlay">
    <Oval
      height={80}
      width={80}
      color="#056903ff"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
) : null}

      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleLogin}>
          <h2 className="login-heading">Login</h2>

          <input
            type="email"
            className="login-field"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-field"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-green-btn" type="submit">
            Login
          </button>

          <p className="login-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="login-link">
              Signup
            </Link>
          </p>
          <p className="login-text">
            <Link to="/ForgotEmail" className="login-link">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
