import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/ForgotEmail.css'
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
function ForgotEmail() {
   let [email,setEmail]=useState("");
   let navigate=useNavigate();
   let [loading,setLoading]=useState(false);
    const send1=async(email,e)=>{
       e.preventDefault();
      setLoading(true);
      try{
        let res=await axios.post('https://hadith-archival-system-1.onrender.com/user/forgot',{
          email
        });
        if(res.status==200){
          let otp=res.data.otp;
          toast.success("Check mail for otp");
          navigate("/ChangePassword", {
          state: { otp, email }
         });
        }
      }
      catch(err){
        toast.error("Try again Later");
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
                            color="#066805ff"
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                            />
                        </div>
                 ) : null}
       <div className="login-wrapper">
        <form className="login-card">
          <h2 className="login-heading">Forgot Password</h2>
          <input
            type="email"
            className="login-field"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="login-green-btn" type="submit" onClick={(e)=>{
            send1(email,e);
          }}>
            Send email
          </button>
        </form>
      </div>
    </>
  )
}

export default ForgotEmail