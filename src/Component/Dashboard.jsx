import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Sidebar from './Sidebar'
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import '../CSS/Dashboard.css'

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  let [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  let navigate=useNavigate();
  const name=sessionStorage.getItem('name');
  const get = async () => {
    setLoading(true);
    try { 
      let res = await axios.get('https://hadith-archival-system-1.onrender.com/Hadith/get');
      if(res.status === 200){
        setData(res.data.data);
      }
    }
    catch(err){
      toast.error("Fetching Error");
    } 
    finally{
      setLoading(false);
    }
  }
  const delete1=async(title)=>{
    console.log(title);
    try{
       let res=await axios.delete('https://hadith-archival-system-1.onrender.com/Hadith/delete1',{
        params: { title }
       })
       if(res.status===200){
          toast.success("Deleted successfully");
          get();
       }
    }
    catch(err){
      toast.error("Try again!!!!")
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
      <Sidebar onToggle={() => setCollapsed(!collapsed)} />

      <div className={`main-dash ${collapsed ? "collapsed" : ""}`}>
        <div className='header'>
          <h1 className="dash-title">Welcome to Dashboard</h1>
          <p className="dash-subtitle">Refer Hadith below</p>
        </div>

        <div className='card-menu'>
          {data.map((item,index) => (
            <div className='card' key={index}>
                   <div className="hadith-text">
                      <p className="hadith-title-tam"><p className='t-para1'>{index+1}:Hadith Name:</p>{item.title}</p>
                      <p className="hadith-title-eng"><p className='t-para1'>{index+1}:Hadith Name:</p>{item.etitle}</p>
                    </div>

                    <div className="hadith-actions">
                      <button className={name=="Admin" ? "show-btn":"show-btnnew"} onClick={()=>{
                        navigate(`Show/${item.etitle}`)
                      }}>Show</button>
                      {
                         name=="Admin"?(<button className="delete-btn" onClick={()=>{
                        delete1(item.title);
                      }
                      }>Delete</button>):(null)
                      }   
                    </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard;
