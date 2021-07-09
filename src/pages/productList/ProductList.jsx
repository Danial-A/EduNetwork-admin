import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductList() {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    const getPosts = async () =>{
      const res = await axios.get(`http://localhost:8080/posts/`)
      setPosts(res.data)
    }
    getPosts()
  },[])
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?")
    if(confirm){
      setPosts(posts.filter((item) => item._id !== id));
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "_id", headerName: "PostID", width: 200 },
    { field: 'fullName',
     headerName: 'Name',
      width: 150,
      sortable:false,
      renderCell: (params) => {
        return(
          <div style = {{textAlign :"center"}}>
            {params.row.author.firstname + " "+ params.row.author.lastname} 
          </div>
        )
      }
    },
    {
      field: "title",
      headerName: "Post",
      width: 200,
    },
    { field: "comments", headerName: "Comments", width: 145,renderCell: (params) => {
      return(
        <div style = {{textAlign :"center"}}>
          {params.row.comments.length}
        </div>
      )
    } },
    
    {
      field: "likes",
      headerName: "Likes",
      width: 110,
      renderCell: (params) => {
        return(
          <div style = {{textAlign :"center"}}>
            {params.row.likes.length}
          </div>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/post/" + params.row._id}>
              <button className="productListEdit">Display</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  var i = 0;
  const rows = posts.map(p=> (
    {...p, id:++i}
  ))
  
  return (
    <div className="productList">
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
