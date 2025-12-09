import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Sidebar from "./Sidebar";
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import '../CSS/Add.css'

const Add = () => {
  let [title, setTitle] = useState("");
  let [etitle, setEtitle] = useState("");
  let [tcontent, setTcontent] = useState("");
  let [econtent, setEcontent] = useState("");
  const [loading,setLoading]=useState(false);
  let navigate = useNavigate();
    
  const handle_submit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      let res=await axios.post('https://hadith-archival-system-1.onrender.com/hadith/Add',{
         title,etitle,tcontent,econtent
      })
      if(res.status===200){
        toast.success("Hadith Added Successfully");
        setTitle("");
        setEtitle("");
        setTcontent("");
        setEcontent("");
        navigate('/Dashboard');
      }
      if(res.status===400){
        toast.error("Try again after sometime");
      }

    }
    catch(err){
       toast.error("Error!!!!!!")

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
                        color="#087606ff"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                        />
                    </div>
            ) : null}
      <Sidebar />

      <div className="signup-wrapper1">
        <form className="signup-card1" onSubmit={handle_submit}>
          <h2 className="signup-heading">Adding content</h2>
          <input
            type="text"
            value={title}
            placeholder="TAM-TITLE"
            className="signup-field"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            value={etitle}
            placeholder="ENG-TITLE"
            className="signup-field"
            onChange={(e) => setEtitle(e.target.value)}
            required
          />

          <textarea
            value={tcontent}
            placeholder="TAMIL CONTENT"
            className="textarea-field"
            onChange={(e) => setTcontent(e.target.value)}
            required
          ></textarea>

          <textarea
            value={econtent}
            placeholder="ENGLISH CONTENT"
            className="textarea-field"
            onChange={(e) => setEcontent(e.target.value)}
            required
          ></textarea>

          <button className="signup-green-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
