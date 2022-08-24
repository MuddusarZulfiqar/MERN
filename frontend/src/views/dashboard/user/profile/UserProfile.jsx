import React from "react";
import { useSelector } from "react-redux";
import "./userProfile.css";
import Dashboard from "../Dashboard";
import Table from 'react-bootstrap/Table';
function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const {data} = user
  // first letter of each word capitalized
  const capitalize = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).split(" ").join(" ");
  };
  console.log(data)
  return (
    <>
      {
        data?.name ? <>
        <Dashboard>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#</td>
            <td>{capitalize(data.name)}</td>
            <td>{data.email}</td>
            <td>{new Date(data.createdAt).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </Table>
    </Dashboard>
        </> : <div id="loading-overlay">
          <div className="loader"></div>
        </div>
      }
    </>
  );
}

export default UserProfile;
