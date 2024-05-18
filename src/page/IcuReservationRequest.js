import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel
} from "@mui/material";

const IcuReservationRequest = () => {
  const [requests, setRequests] = useState()
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const fetchAdmit = async () => {
    try {
      const response = await axios.get("http://localhost:8080/icuReservationRequests/manage-icu-reservation-requests", {
        headers: headers,
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching admit:", error);
    }
  };
  useEffect(() => {
    fetchAdmit();
  }, []);

  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
          <div className="D_date-display">Date:  14-May-2024</div>

          <div className="D_user-info">
            <span>Admin</span>
            <span>admin@au.edu.pk</span>
            <a href="/login">
              <button type="button">Log out</button>
            </a>
          </div>

          <div className="D_navigation">
            <ul>
              <li>
                <a href="/admin">Home</a>
              </li>
              <li>
                <a href="/hospitals">Hospitals</a>
              </li>
              <li>
                <a href="/inpatientroomsadmin">Rooms</a>
              </li>
              <li><a href="/inpatientroomstodayadmin">Inpatient Rooms</a></li>
              <li>
                <a href="/inpatientroomhistoryadmin">Inpatient Room History</a>
              </li>
              <li>
                <a href="/addroomsadmin">Add Room</a>
              </li>
              <li>
                <a href="/icureservationrequest">ICU Reservation Request</a>
              </li>
              <li>
                <a href="/icureservation">ICU Reservation</a>
              </li>
              <li>
                <a href="/doctorappointmenthistoryadmin">
                  Doctor Appointments History
                </a>
              </li>
            
            </ul>
          </div>
        </div>
        <div className="D_containerright">
          <h4>Admin Panel</h4>
          <h2>ICU Reservation Request</h2>
          <div className="D_search-bar">
          <input type="text" placeholder="Search " 
 />
            <button type="button" >Search</button>
          </div>

          <div className="Patient_health_record_data">
            <table>
              <thead>
                <tr>
                  <th> Id</th>
                  <th>Requesting Hospital Id</th>
                  <th>Requested Hospital Id</th>
                  <th>ICU Room ID</th>
                  <th>Patient ID </th>
                  <th>Request date </th>
                  <th>Status</th>
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
           
                 <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                    </td>
                    <td>
                      {/* Edit and Delete buttons */}
                      <button >Edit</button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                
              </tbody>
            </table>
            <div className="Button">
              <button className="add" >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default IcuReservationRequest;
