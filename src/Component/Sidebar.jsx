import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import '../CSS/Sidenavbar.css';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const name = sessionStorage.getItem('name');
  let logout = useLogout();
  let navigate = useNavigate();

  return (
    <>

      <div className="mobile-nav-btn" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* Sidebar / Topbar */}
      <div className={`Side-nav ${open ? "active" : ""}`}>
        
        {/* MENU ITEMS */}
        <div className="div1" onClick={() => navigate('/Dashboard')}>
          <p className='para1'>Home</p>
        </div>

        <div className="div1" onClick={() => navigate('/About')}>
          <p className='para1'>About</p>
        </div>

        {name === "Admin" && (
          <div className="div1" onClick={() => navigate('/Add')}>
            <p className='para1'>Add</p>
          </div>
        )}

        {name === "Admin" && (
          <div className="div1" onClick={() => navigate('/AdminPanel')}>
            <p className='para1'>Admin Panel</p>
          </div>
        )}

        <div className="logout-div" onClick={() => logout()}>
          <p className='para1'>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></p>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
