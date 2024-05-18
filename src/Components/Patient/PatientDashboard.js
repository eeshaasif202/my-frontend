import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./PatientDashboard.css";
import hcp_logo from "../Assets/hcpLogo.png";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
    const [id, setId] = useState(null);
    const [address, setAddress] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error("Logout failed:", error);
    }
  };
  const [userInfo, setUserInfo] = useState([]);
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/userInfo/get", {
        headers: headers, // Include the headers in the request
      });
      setUserInfo(response.data); // Assuming the response contains an array of hospitals
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const handleEdit = async (hospitalId) => {
    setId(hospitalId);
    setOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/userInfo/${hospitalId}`,
        {
          headers: headers,
        }
      );
      const data = response.data; // Assuming the response contains an array of hospitals
      setAddress(null)
      setAge(null)
      setFatherName(null)
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setAddress(null);
    setAge(null);
    setFatherName(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        await axios.put(`http://localhost:8080/userInfo/edit/${id}?address=${address}&age=${age}&fatherName=${fatherName}`, {}, {
          headers,
        });
        fetchUserInfo();
        handleClose();
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
  };
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
         

          <div className="D_user-info">
            <div className="logo">
              <img src={hcp_logo} alt="" />
              <span>Patient</span>
            </div>
         
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <hr></hr>
          <div className="D_navigation">
          <ul>
              <li>
                <a href="/patient">Home</a>
              </li>
              <li>
                <a href="/addappointment">Add Appintment</a>
              </li>
              <li>
                <a href="/appointments">Appointment History</a>
              </li>
              <li>
                <a href="/health">Health record</a>
              </li>
              <li>
                <a href="/viewhospitals">View Hospitals</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="P_containerright">
          <div className="P_welcome">
            <div className="P_welcome_text">
              <h4>Welcome</h4>

              <h2>Patient Panel</h2>
              <br></br>

              <div className="D_search-bar">
                <input
                  type="text"
                  placeholder="Search Doctor name and sessions available"
                />
                <button type="button">Search</button>
              </div>
            </div>
          </div>
          <div className="D_status"></div>

          <div className="D_lowermaincontainer">
            <div className="D_lowerleftcontainer">
              <div className="D_upcoming-appointments">
                <h2>Patient Profile</h2>
                {/* <p>More details available in @Appointment section.</p> */}
                <div className="patientprofile">
                  <table>
                    <thead>
                      <tr>
                        <th>Patient Id</th>
                        <th>Email</th>

                        <th>Name</th>

                        <th>Username</th>
                        <th>Address</th>

                        <th>Age</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                        <tr key={userInfo.id}>
                          <td>{userInfo.userId?.id}</td>
                          <td>{userInfo.userId?.email}</td>
                          <td>{userInfo.userId?.name}</td>
                          <td>{userInfo.userId?.username}</td>
                          <td>{userInfo.address}</td>
                          <td>{userInfo.age}</td>
                          <td>
                        {/* Edit and Delete buttons */}
                        <button onClick={() => handleEdit(userInfo.id)}>
                          Edit
                        </button>
                      </td>
                        </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <a href="/appointments">
                    <button type="button">Show All Appointments</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Address"
              required
              fullWidth
              value={address}
              margin="normal"
              type="text"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <TextField
              label="Age"
              required
              fullWidth
              margin="normal"
              value={age}
              type="text"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <TextField
              label="Father Name"
              required
              fullWidth
              margin="normal"
              value={fatherName}
              type="text"
              onChange={(e) => {
                setFatherName(e.target.value);
              }}
            />

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ minWidth: "6rem" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;
