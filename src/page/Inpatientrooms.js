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

const Inpatientrooms = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [formMode, setMode] = useState("Add");
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [noOfBeds, setNoOfBeds] = useState(null);
  const [id, setId] = useState(null);

  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/room", {
        headers: headers, // Include the headers in the request
      });
      setRooms(response.data); // Assuming the response contains an array of rooms
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      noOfBeds,
      departmentId: { id: departmentId }, // Assuming cityId needs an object structure
    };
    const formDataUpdate = {
      id,
      name,
      noOfBeds,
      departmentId: { id: departmentId }, // Assuming cityId needs an object structure
    };
    if (formMode === "Add") {
      try {
        await axios.post("http://localhost:8080/room", formData, {
          headers,
        });
        fetchRooms();
        handleClose();
      } catch (error) {
        console.error("Error adding room:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/room", formDataUpdate, {
          headers,
        });
        fetchRooms();
        handleClose();
      } catch (error) {
        console.error("Error updating room:", error);
      }
    }
  };

  // Function to handle editing a room
  const handleEdit = async (roomId) => {
    setId(roomId);
    setMode("Update");
    setOpen(true);
    try {
      const response = await axios.get(`http://localhost:8080/room/${roomId}`, {
        headers: headers,
      });
      const data = response.data; // Assuming the response contains an array of rooms
      setName(data.name);
      setNoOfBeds(data.noOfBeds);
      setDepartmentId(data.departmentId?.id);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  // Function to handle deleting a room
  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/room/${roomId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchRooms();
      }
    } catch (error) {}
  };
  const handleAdd = () => {
    setMode("Add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName(null);
    setNoOfBeds(null);
    setDepartmentId(null);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    const filteredRooms = rooms.filter(
      (hospital) => hospital.id === parseInt(searchQuery)
    );
    setRooms(filteredRooms);
  }

  useEffect(() => {
    if (searchQuery === "") {
      // Fetch hospitals only if the searchQuery meets the criteria (length > 1)
      fetchRooms();
    }
  }, [searchQuery]);
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
          

          <div className="D_user-info">
            <span>Doctor</span>
          
            <a href="/login">
              <button type="button">Log out</button>
            </a>
          </div>

          <div className="D_navigation">
            <ul>
              <li>
                <a href="/doctor">Home</a>
              </li>
              <li>
                <a href="/sessions">Today Sessions</a>
              </li>
              <li>
                <a href="/doctorappointmenthistory">
                  Doctor Appointment Hisotry
                </a>
              </li>
              <li>
                <a href="/patienthealthrecord">Health Record</a>
              </li>
              <li>
                <a href="/patientstest">Patient Tests</a>
              </li>
              <li>
                <a href="/inpatientrooms"> Rooms</a>
              </li>
              <li>
                <a href="/inpatientroomhisory">InPatient Room History</a>
              </li>
              <li>
                <a href="/addrooms">Add Rooms</a>
              </li>
            
            </ul>
          </div>
        </div>
        <div className="D_containerright">
          <h4>Doctor Panel</h4>
          <h2>Inpatient Rooms</h2>
          <div className="D_search-bar">
          <input type="text" placeholder="Search " value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="button" onClick={handleSearch}>Search</button>
          </div>

          <div className="Patient_health_record_data">
            <table>
              <thead>
                <tr>
                  <th>Room Id</th>
                  <th> Name</th>
                  <th>Department Id </th>
                  <th>No. of beds </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.name}</td>
                    <td>{room.noOfBeds}</td>
                    <td>{room.departmentId.id}</td>

                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleEdit(room.id)}>Edit</button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleDelete(room.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="Button">
              <button className="add" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              margin="normal"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              label="No of Beds"
              required
              fullWidth
              margin="normal"
              value={noOfBeds}
              type="number"
              onChange={(e) => {
                setNoOfBeds(e.target.value);
              }}
            />
            <TextField
              label="Department Id"
              required
              fullWidth
              margin="normal"
              value={departmentId}
              type="number"
              onChange={(e) => {
                setDepartmentId(e.target.value);
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
                {formMode}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inpatientrooms;
