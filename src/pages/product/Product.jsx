import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Product() {
    const [post,setPost] = useState({})
    const {postId} = useParams()
    useEffect(()=>{
        const getPost = async() =>{
            const res = await axios.get(`http://localhost:8080/posts/${postId}`)
            setPost(res.data)
        }
        getPost()
    },[postId])
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Post</h1>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Likes" title="Post Analytics"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
              <h3>Title: </h3>
                  <span className="productName">{post.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Post ID: </span>
                      <span className="productInfoValue">{post._id}</span>
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
                      <span className="productInfoKey">Reports:</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom postBody">
            <h2>Post Body: </h2>
          <span style = {{paddingTop:"200px"}}>{post.body}</span>
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
    </div>
  );
}
