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

const Patientstest = () => {
  const [tests, setTests] = useState([]);
  const [open, setOpen] = useState(false);
  const [formMode, setMode] = useState("Add");
  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(null);

  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const fetchTests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/test/get", {
        headers: headers,
      });
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      status,
      patientId
    };
    const formDataUpdate = {
      id,
      name,
      status,
      patientId
    };
    if (formMode === "Add") {
      try {
        await axios.post("http://localhost:8080/test", formData, {
          headers,
        });
        fetchTests();
        handleClose();
      } catch (error) {
        console.error("Error adding room:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/test", formDataUpdate, {
          headers,
        });
        fetchTests();
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
      const response = await axios.get(
        `http://localhost:8080/test/${roomId}`,
        {
          headers: headers,
        }
      );
      const data = response.data; // Assuming the response contains an array of rooms
      setName(data.name);
      setStatus(data.status);
      setPatientId(data.patientId);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // Function to handle deleting a room
  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/test/${roomId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchTests();
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
    setStatus(null);
    setPatientId(null);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    const filteredRooms = tests.filter(
      (pateint) => pateint.patientId === parseInt(searchQuery)
    );
    setTests(filteredRooms);
  };

  useEffect(() => {
    if (searchQuery === "") {
      // Fetch hospitals only if the searchQuery meets the criteria (length > 1)
      fetchTests();
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
          <h2>Patient Tests</h2>
          <div className="D_search-bar">
            <input
              type="text"
              placeholder="Search "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <h3>Tests</h3>
          <div className="Patient_health_record_data">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Patient Id</th>
                  <th> Name</th>
                  <th>Status </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((tests) => (
                  <tr key={tests.id}>
                    <td>{tests.id}</td>
                    <td>{tests.patientId}</td>
                    <td>{tests.name}</td>
                    <td>{tests.status}</td>

                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleEdit(tests.id)}>Edit</button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleDelete(tests.id)}
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
              label="Patient Id"
              required
              fullWidth
              margin="normal"
              value={patientId}
              type="text"
              onChange={(e) => {
                setPatientId(e.target.value);
              }}
            />
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
              label="Status"
              required
              fullWidth
              margin="normal"
              value={status}
              type="text"
              onChange={(e) => {
                setStatus(e.target.value);
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

export default Patientstest;
