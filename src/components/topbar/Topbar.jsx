import React from "react";
import "./topbar.css";
import {Button} from '@material-ui/core'
export default function Topbar() {
  const HandleLogout = () =>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">EduNetwork</span>
        </div>
        <div className="topRight">

          <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="topAvatar" />
          <span style = {{paddingLeft:"10px", fontSize:"18px", fontWeight:"bold", marginRight:"10px"}}>{localStorage.getItem('username')}</span>
          <Button variant = "contained" color = "primary" onClick = {()=> HandleLogout()}>Logout</Button>
         
        </div>
        
      </div>
     
    </div>
  );
}
