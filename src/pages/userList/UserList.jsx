import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import moment from 'moment'

export default function UserList() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const fetchUsers = async () =>{
      try{
        const res = await axios.get('http://localhost:8080/users/admin/all')
        await setData(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchUsers()
  },[])
  const handleDelete = async(id) => {
    const answer = window.confirm("Are you sure you want to delete this user?")
    if(answer){
      const res = await axios.delete(`http://localhost:8080/users/${id}/delete`)
      const deleteUserPosts = await axios.delete(`http://localhost:8080/posts/user/delete`,{userid:id})
      setData(data.filter((item) => item._id !== id));
    }else{
      return null
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: '_id', headerName: 'UserID', width: 200 },

    {
      field: 'firstname',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastname',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 140,
      editable: true,
    },
    {
      field:"createdAt",
      headerName :"Joined",
      width:150,
      renderCell: (params) => {
        return(
          <div style = {{textAlign :"center"}}>
            {moment(params.row.createdAt).format("Do MMMM, YYYY")} 
          </div>
        )
      }
    }
    ,
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
    

  ];
  var i = 0
  const rows = data.map(u => (
    {...u, id : ++i}
  ))
  return (
    <div className="userList">
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    checkboxSelection
    disableSelectionOnClick
    />
    </div>
  );
}
