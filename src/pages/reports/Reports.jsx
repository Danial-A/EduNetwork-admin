import "./Reports.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios'
import moment from 'moment'

export default function Reports() {
  const [reports,setReports] = useState([])

  useEffect(()=>{
    const getReports = async () =>{
      const res = await axios.get(`http://localhost:8080/reports/`)
      setReports(res.data)
    }
    getReports()
  },[])

  const handleDelete =async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this report?")
    if(confirm){  
      const res = await axios.post(`http://localhost:8080/reports/${id}/delete`)
      console.log(res.data)
      setReports(reports.filter((item) => item._id !== id));
    }
  };
  console.log(reports)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Full Name",
      headerName: "Reported By",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {params.row.userid.firstname.toUpperCase()} {params.row.userid.lastname.toUpperCase()}
          </div>
        );
      },
    },
    { field: "postid", headerName: "Post ID", width: 200 },
    {
      field: "reason",
      headerName: "Reason",
      width: 120,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
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
            <Link to={"/report/" + params.row._id}>
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

  var i = 0
  const rows = reports.map(u => (
    {...u, id : ++i}
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
