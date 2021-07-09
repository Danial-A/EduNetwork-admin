import "./Report.css";
import moment from 'moment'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {Button} from '@material-ui/core'
import { useHistory } from "react-router";


export default function Report() {
    const [report,setReport] = useState({})
    const [post,setPost] = useState({})
    const [postid,setPostId] = useState('')
    const {reportid} = useParams()
    const history = useHistory()

    useEffect(()=>{
        const getReport = async() =>{
            const res = await axios.get(`http://localhost:8080/reports/${reportid}`)
            setReport(res.data)
            setPostId(res.data.postid)
        }
        getReport()
       
    },[reportid])
    useEffect(()=>{
        const getPost = async () =>{
            const res = await axios.get(`http://localhost:8080/posts/${postid}`)
            setPost(res.data)
        }
        getPost()
    },[postid])

    const handleDeletePost = async()=>{
        try{
            const confirm = window.confirm("Are you sure you want to delete this post?")
            if(confirm){
                 const res = await axios.post(`http://localhost:8080/posts/delete/${postid}`)
                 //const deleteReport = await axios.post(`http://localhost:8080/reports/${report._id}/delete`)
                 //console.log(deleteReport.data)
                 window.alert(res.data)
                 history.push(('/reports'))
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Report</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
              <h3>Information: </h3>
              </div>
              <div className="productInfoBottom">
                  <div className="reportInfoItem">
                      <span className="productInfoKey">Description: </span>
                      <span className="productInfoValue">{report.description}</span>
                  </div>
                  <div className="reportInfoItem">
                      <span className="productInfoKey">Reason: </span>
                      <span className="productInfoValue">{report.reason}</span>
                  </div>
                  <div className="reportInfoItem">
                      <span className="productInfoKey">Post ID:</span>
                      <span className="productInfoValue">{report.postid}</span>
                  </div>
                  <div className="reportInfoItem">
                      <span className="productInfoKey">Reported By:</span>
                      <span className="productInfoValue">{report.userid?.firstname} {report.userid?.lastname}</span>
                  </div>
                  <div className="reportInfoItem">
                      <span className="productInfoKey">Date:</span>
                      <span className="productInfoValue">{moment(report.createdAt).format("Do MMMM, YYYY")}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom postBody">
            <h2>Post Information: </h2>
          <span style = {{paddingTop:"200px"}}>{}</span>
          <div className="productInfoItem">
                <span className="productInfoKey">Author:</span>
                <span className="productInfoValue">{post.author?.firstname} {post.author?.lastname}</span>
          </div>
          <div className="productInfoItem">
                <span className="productInfoKey">Likes:</span>
                <span className="productInfoValue">{post.likes?.length}</span>
          </div>
          <div className="productInfoItem">
                <span className="productInfoKey">Comments:</span>
                <span className="productInfoValue">{post.comments?.length}</span>
          </div>
          <div className="productInfoItem">
                <span className="productInfoKey">Created At:</span>
                <span className="productInfoValue">{moment(post.createdAt).format("Do MMMM, YYYY")}</span>
          </div>
      </div>
      <div className="productBottom postBody">
           <div className="postBodySection">
            <h2>Post Title: <span>{post.title}</span></h2>
           </div>
           <div className="postBodySection">
           <h2>Post Body: </h2>
           <span style = {{paddingTop:"200px"}}>{post.body}</span>
          </div>
      </div>
      <div className="productBottom">
      <h2>Comments</h2>
        {
            post.comments?.length > 0 ? post.comments?.map(c=>(
                <div className="productBottom commentBody">
                    <h4>{c.userid.username}:</h4>
                    <span>{c.body}</span>
                </div>
            )) : <div style = {{textAlign:"center"}}>No Comments For This Post</div>
        }
        </div>
        <div className = "delete-button">
            <Button variant="contained" color="secondary" onClick = {(e)=>{
                e.preventDefault()
                handleDeletePost()
            }}>Delete Post?</Button>
        </div>
        
    </div>
  );
}
