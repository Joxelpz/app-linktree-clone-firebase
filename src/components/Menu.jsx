import React, { useState } from 'react'
import "../css/menu.css"
import { useNavigate } from 'react-router-dom';
import {  logout } from '../firebase/firebase';
import menu from "../assets/menu.png"
import user from "../assets/user.png"
import logo from "../assets/logo.png"


export const Menu = ( { children }) => {

  const navigate = useNavigate();

  function handleLogout(){
    logout();
  }

  const userPublic = JSON.parse(localStorage.getItem("user"))

  const [ showMenuMobile, setShowMenuMobile ] = useState(false)




  return (
    <div>
        <nav className='wrapper-menu'>
            <div className='logotipo-menu'><img src={logo} alt="" /></div>
            <div className='img-menu-resp' onClick={ () => setShowMenuMobile( !showMenuMobile )}><img src={menu} alt="" /></div>
            <div className={`${showMenuMobile === true ? 'navigation-mobile' : 'nav-menu'}`}>
              <ul className={`${showMenuMobile === true ? 'menu-navigation-mobile' : 'nav-menu'}`}>
                  <li onClick={ () => navigate("/dashboard")} >Dashboard</li>
                  <li onClick={ () => navigate("/profile")} >Perfil</li>
                  <li className='buton-user' onClick={ () => navigate(`/${userPublic?.username}`)} ><img className='user-icon' src={user} alt="" /><span>{userPublic?.username}</span></li>
                  <li onClick={handleLogout}>Cerrar sesión</li>
              </ul>
            </div> 
        </nav>
        <div>
            {children}
        </div>
    </div>
  )
}
