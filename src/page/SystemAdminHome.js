import React, { useEffect, useState } from "react";
import SystemAdminDashboard from "../Components/SystemAdmin/SystemAdminDashboard.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
// import hcp_logo from '../Assets/hcpLogo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SystemAdminHome = () => {
  const [id, setId] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
      const data = response.data;
      setAddress(null);
      setAge(null);
      setName(null);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setAddress(null);
    setAge(null);
    setName(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/userInfo/edit/${id}?address=${address}&age=${age}&fatherName=${name}`,
        {},
        {
          headers,
        }
      );
      fetchUserInfo();
      handleClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };
  return (
    <div>
      <div>
        <div className="D_maincontainer">
          <div className="D_containerleft">
           

            <div className="D_user-info">
              <div className="logo">
                {/* <img src={hcp_logo} alt="" /> */}
                <span>System Admin</span>
              </div>

              

              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
            <hr></hr>
            <div className="D_navigation">
              <ul>
                <li>
                  <a href="/sytemadminhome">Home</a>
                </li>
                <li>
                  <a href="viewhospitalssystemadmin">View Hospitals</a>
                </li>
                <li>
                  <a href="registerhospital">Register Hospital</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="D_containerright">
            <div className="D_search-bar">
              <input type="text" placeholder="Search Hospital" />
              <a href="/login">
                <button type="button">Search</button>
              </a>
            </div>
            <div className="Ap_lowerleftcontainer">
              <div className="Ap_upcoming-appointments">
                <h2>Profile </h2>
                {/* <p>More details available in @Appointment section.</p> */}
                <table>
                  <thead>
                    <tr>
                      <th>Admin Id</th>
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
              label="Name"
              required
              fullWidth
              margin="normal"
              value={name}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
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
export default SystemAdminHome;
