import "./Feedback.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import moment from "moment";
import axios from 'axios'

export default function Feedback() {
  const [feedback,setFeedback] = useState([])

  useEffect(()=>{
    const getFeedback = async () =>{
      const res = await axios.get(`http://localhost:8080/feedbacks/`)
      setFeedback(res.data)
    }
    getFeedback()
  },[])
  console.log(feedback)
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this feedback?")
    if(confirm){
      setFeedback(feedback.filter((item) => item._id !== id));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "email", headerName: "Email ID", width: 200 },
    {
      field: "feedbackBody",
      headerName: "Feedback",
      width: 450,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 160,
      renderCell:(params) =>{
        return(
          <div>{moment(params.row.createdAt).format("Do MMMM, YYYY")}</div>
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
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
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
  const rows = feedback.map(f=> (
    {...f, id:++i}
  ))

  return (
    <div className="productList">
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
