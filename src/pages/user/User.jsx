import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

export default function User() {
  const {userId} = useParams()
  const [user,setUser] = useState({})
  const [image,setImage] = useState()
  useEffect(()=>{
    const getUser = async () =>{
      try{
        const res = await axios.get(`http://localhost:8080/users/${userId}`)
        setUser(res.data)
        setImage(`http://localhost:8080/uploads/users/${res.data._id}/${res.data.profileImage}`)
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[userId])
  console.log(user)
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={image}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.firstname} {user.lastname}</span>
              <span className="userShowUserTitle">@{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Followers: {user.followers?.length}</span>
            </div>
            <div className="userShowInfo">
            <PermIdentity className="userShowIcon" />
            <span className="userShowInfoTitle">Following: {user.following?.length}</span>
          </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{moment(user.dob).format("Do MMMM, YYYY")}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.emailid}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value = {user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value = {user.firstname +" "+  user.lastname}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value = {user.emailid}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>DOB</label>
                <input
                  type="date"
                  defaultValue = {moment(user.dob).format()}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={image}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
