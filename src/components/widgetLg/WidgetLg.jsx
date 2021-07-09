import "./widgetLg.css";
import { useState,useEffect } from "react";
import axios from 'axios'
import moment from 'moment'

export default function WidgetLg() {

  const [posts,setPosts] = useState([])
  useEffect(()=>{
    const getPosts = async ()=>{
      const res = await axios.get('http://localhost:8080/posts/latest/posts')
      setPosts(res.data)
    }
    getPosts()
  },[])
  console.log(posts)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Posts By Users</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">User</th>
          <th className="widgetLgTh">Created At</th>
          <th className="widgetLgTh">Likes</th>
          <th className="widgetLgTh">Comments</th>
        </tr>
      {
        posts.length > 0 ? 
        posts.map(p=>(
          <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src={`http://localhost:8080/uploads/users/${p.author._id}/${p.author.profileImage}`}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{p.author.firstname.toUpperCase()} {p.author.lastname.toUpperCase()}</span>
          </td>
          <td className="widgetLgDate">{moment(p.createdAt).format("D-MMM-YYYY")}</td>
          <td className="widgetLgAmount">{p.likes.length}</td>
          <td className="widgetLgStatus">
            {p.comments.length}
          </td>
        </tr>
        ))
        : <div>No posts</div>
      }
       
      </table>
    </div>
  );
}
