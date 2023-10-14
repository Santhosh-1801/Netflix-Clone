import React, { useEffect, useState } from 'react'
import "../src/Nav.css"
import netflixLogo from "../src/netflix-logo.png"
import { useNavigate } from 'react-router-dom'

export const Nav = () => {
  const navigate=useNavigate();

  const [show,handleShow]=useState(false);

  const transitionNavbar=()=>{
    if(window.scrollY>100){
        handleShow(true);
    }
    else {
        handleShow(false);
    }
  }
  useEffect(()=>{
   window.addEventListener("scroll",transitionNavbar);
   return ()=>window.removeEventListener("scroll",transitionNavbar);
  },[])

  return (
    <div className={`nav ${show && "nav__black"}`}>
    <div className='nav__contents'>
    <img className='nav__logo' src={netflixLogo} alt='' onClick={()=>navigate("/")} />
    <img className='nav__avatar' onClick={()=>navigate("/profile")} src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
    </div>
    </div>
  )
}
