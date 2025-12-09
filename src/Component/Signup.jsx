import React, { useState } from "react";
import { generatePath, Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import '../CSS/Signup.css'

const SignupPage = () => {
  let [firstName,setFirstName]=useState("");
  let[lastName,setLastName]=useState("");
  let [email,setEmail]=useState("");
  let[password,setPassword]=useState("");
  let [confirmPassword,setConfirmPassword]=useState("");
  let [age,setAge]=useState(0);
  let [phone,setPhone]=useState("");
  let [gender,setGender]=useState("");
  const [loading,setLoading]=useState(false);
  let navigate=useNavigate();
  const handleSignup=async(e)=>{
    e.preventDefault(); 
    setLoading(true);
    try{
      let res=await axios.post("https://hadith-archival-system-1.onrender.com/user/signup",{
        firstName,lastName,email,password,confirmPassword,age,phone,gender
      })
      if(res.status===401){
        toast.error("Password Mismatch");
      }
      if(res.status===402){
        toast.error("User Already Exist");
      }
      if(res.status===200){
        toast.success("Account Created Successfully");
        navigate('/');
      }

    }
    catch{
        toast.error("Try again");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
     {loading ? (
      <div className="loader-overlay">
        <Oval
          height={80}
          width={80}
          color="#056504ff"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    ) : null}
  
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2 className="signup-heading">Signup</h2>

        <input type="text" name="firstname" value={firstName} placeholder="First Name" className="signup-field" onChange={(e)=>{setFirstName(e.target.value)}}  required />

        <input type="text" name="lastname" value={lastName} placeholder="Last Name" className="signup-field" onChange={(e)=>{
        setLastName(e.target.value)
        }} required />

        <input type="number" name="age"  value={ age} placeholder="Age" className="signup-field" 
        onChange={(e)=>{
          setAge(e.target.value)
        }} required />

        <input type="email" name="email" placeholder="Email" value={email} className="signup-field" 
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        required />

        <input type="password" name="password" placeholder="Password" value={password} className="signup-field" 
        onChange={(e)=>{
          setPassword(e.target.value)
        }} required />

        <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" className="signup-field" 
        onChange={(e)=>{
          setConfirmPassword(e.target.value)
        }} required />

        <select name="gender" className="signup-field" value={gender} 
        onChange={(e)=>{
          setGender(e.target.value)
        }} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="text" name="phone" placeholder="Phone Number" value={phone} className="signup-field"  
        onChange={(e)=>{
          setPhone(e.target.value);
        }}
        required />

        <button className="signup-green-btn" type="submit">Signup</button>

        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/" className="signup-link">Login</Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default SignupPage;
