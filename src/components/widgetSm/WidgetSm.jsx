import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function WidgetSm() {

  const [users,setUsers] = useState([])
  useEffect(()=>{
    const getUsers = async ()=>{
      const res = await axios.get('http://localhost:8080/users/new/registered')
      console.log(res.data)
      setUsers(res.data)
    }
    getUsers()
  },[])
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
       {
         users.length > 0 ? 
         users.map(u=> (
          <li className="widgetSmListItem">
          <img
            src={`http://localhost:8080/uploads/users/${u._id}/${u.profileImage}`}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{u.firstname.toUpperCase()} {u.lastname.toUpperCase()}</span>
            <span className="widgetSmUserTitle">{u.username}</span>
          </div>
          <button className="widgetSmButton">
            <Link style = {{textDecoration:"none"}} to = {`/user/${u._id}`}>
              <Visibility className="widgetSmIcon" />
              Display
            </Link>
          </button>
        </li>
         )) : 
       <div>No users </div>
       }
        
      </ul>
    </div>
  );
}
