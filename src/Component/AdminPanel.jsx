import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import axios from  'axios';
import toast from 'react-hot-toast';
import '../CSS/AdminPanel.css'
import { useSearchParams } from 'react-router-dom';
function AdminPanel() {
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState([]);
    const get=async()=>{
        try{
            let res=await axios.get('https://hadith-archival-system-1.onrender.com/user/get');
            if(res.status===200){
              setData(res.data.data);
            }
        }
        catch(err){
         toast.error("Fetching error!!!")
        }
    }
    const delete1=async(email)=>{
        console.log(email);
        
        try{
            let res=await axios.delete('https://hadith-archival-system-1.onrender.com/user/delete1', {params: {email}});
            if(res.status===200){
                toast.success("User Deleted Successfully");
                get();
            }
        }
        catch(err){
               toast.error(err.message);
        }

    }
   

useEffect(()=>{
    get();
},[])

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
    <Sidebar/>
    <div className='adminpanel-div'>
         <div className='header1'>
                <h1 className="dash-title">Welcome to AdminPanel</h1>
                <p className="dash-subtitle">List of Users</p>
        </div>
        {
            data.map((item,index)=>(
        <div className='List1' key={index}>
            <div className='left'>
                <p className='left-para'><b>Name:</b>{item.firstName}</p>
                <p className='left-para'><b>Email:</b>{item.email}</p>
            </div>
            <div className='right'>
                <button className='dlt1'  onClick={()=>{
                    delete1(item.email);
                }}>Delete</button>
            </div>
        </div>
        )
    )
        }
       
    </div>
    </>
    
  )
} 
export default AdminPanel