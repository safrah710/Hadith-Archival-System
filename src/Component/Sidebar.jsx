import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import '../CSS/Sidenavbar.css';

function Sidebar() {

  const [isShifted, setIsShifted] = useState(false);

  const change = () => {
    setIsShifted(!isShifted);
  };
  const name=sessionStorage.getItem('name');
  let logout=useLogout();
  let navigate=useNavigate();

  return (
    <>
      <div className="main-div">
        <div className={`Side-nav ${isShifted ? "shift-left" : ""}`}>
          <div className="nav" onClick={change}>
            <i className="fa-solid fa-bars"></i>
          </div>

          <div className="div1" onClick={()=>{
            navigate('/Dashboard')
          }}><p className='para1'>Home</p>
          </div>
          <div className="div1" onClick={()=>{
            navigate('/About')
          }}><p className='para1'>About</p></div>
          {
            name=="Admin"?(<div className="div1" onClick={()=>{
            navigate('/Add');
          }}><p className='para1'>Add</p></div>):(null)
          }
          {
            name=="Admin"?(<div className="div1" onClick={()=>{
              navigate('/AdminPanel');
            }}><p className='para1'>Admin Panel</p></div>):(null)
          }
          <div className={name=="Admin"?"div3":"div2"} onClick={()=>{
            logout();
          }}><p className='para1' >Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></p></div>

        </div>
      </div>
    </>
  );
}

export default Sidebar;
