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

const InpatientRoomHistoryAdmin = () => {
  const [admit, setAdmit] = useState([]);
  const [open, setOpen] = useState(false);
  const [formMode, setMode] = useState("Add");
  const [appointmentId, setAppointmentId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [admitDate, setAdmitDate] = useState("");
  const [dischargedDate, setDischargedDate] = useState("");
  const [id, setId] = useState(null);

  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchAdmit = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admit/get", {
        headers: headers, // Include the headers in the request
      });
      setAdmit(response.data); // Assuming the response contains an array of rooms
    } catch (error) {
      console.error("Error fetching admit:", error);
    }
  };
  useEffect(() => {
    fetchAdmit();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      appointmentId: { id: appointmentId },
      doctorId: { id: doctorId },
      roomId: { id: roomId },
      admitDate,
      dischargedDate,
    };
    const formDataUpdate = {
      id,
      appointmentId: { id: appointmentId },
      doctorId: { id: doctorId },
      roomId: { id: roomId },
      admitDate,
      dischargedDate,
    };
    if (formMode === "Add") {
      try {
        await axios.post("http://localhost:8080/admit", formData, {
          headers,
        });
        fetchAdmit();
        handleClose();
      } catch (error) {
        console.error("Error adding admit:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/admit", formDataUpdate, {
          headers,
        });
        fetchAdmit();
        handleClose();
      } catch (error) {
        console.error("Error updating admit:", error);
      }
    }
  };

  // Function to handle editing a admit
  const handleEdit = async (roomId) => {
    setId(roomId);
    setMode("Update");
    setOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/admit/${roomId}`,
        {
          headers: headers,
        }
      );
      const data = response.data; // Assuming the response contains an array of rooms
      setAppointmentId(data.appointmentId);
      setDoctorId(data.doctorId);
      setRoomId(data.roomId);
      setAdmitDate(DateConverter(data.admitDate));
      setDischargedDate(DateConverter(data.dischargedDate));
    } catch (error) {
      console.error("Error fetching admit:", error);
    }
  };

  // Function to handle deleting a admit
  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admit/${roomId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchAdmit();
      }
    } catch (error) {}
  };
  const handleAdd = () => {
    setMode("Add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAppointmentId(null);
    setDoctorId(null);
    setRoomId(null);
    setAdmitDate(null);
    setDischargedDate(null);
  };
  function DateConverter(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}
const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    const filteredRooms = admit.filter(
      (hospital) => hospital.id === parseInt(searchQuery)
    );
    setAdmit(filteredRooms);
  }

  useEffect(() => {
    if (searchQuery === "") {
      // Fetch hospitals only if the searchQuery meets the criteria (length > 1)
      fetchAdmit();
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
         

          <div className="D_user-info">
            <span>Admin</span>
           
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
                <a href="/inpatientroomsadmin"> Rooms</a>
              </li>
              <li>
                <a href="/inpatientroomhistoryadmin">Inpatient Room History</a>
              </li>
              <li>
                <a href="/addroomsadmin">Add Room</a>
              </li>
              <li>
                <a href="/doctorappointmenthistoryadmin">
                  Doctor Appointments History
                </a>
              </li>
              {/* <li>
                <a href="/addDoctor">Add Doctor</a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="D_containerright">
          <h4>Admin Panel</h4>
          <h2>Inpatient Room History</h2>
          <div className="D_search-bar">
          <input type="text" placeholder="Search " value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="button" onClick={handleSearch}>Search</button>
          </div>

          <div className="Patient_health_record_data">
            <table>
              <thead>
                <tr>
                  <th>Admit Id</th>
                  <th> Appointment Id</th>
                  <th>Doctor Id</th>
                  <th>Room Id </th>
                  <th>Admit Date </th>
                  <th>Discharge Date </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(admit) && admit.map((admit) => (
                  <tr key={admit.id}>
                    <td>{admit.id}</td>
                    <td>{admit.appointmentId}</td>
                    <td>{admit.doctorId}</td>
                    <td>{admit.roomId}</td>
                    <td>{DateConverter(admit.admitDate)}</td>
                    <td>{DateConverter(admit.dischargedDate)}</td>

                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleEdit(admit.id)}>Edit</button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleDelete(admit.id)}
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
              label="Appointment Id"
            //   required
              fullWidth
              value={appointmentId}
              margin="normal"
              type="text"
              onChange={(e) => {
                setAppointmentId(e.target.value);
              }}
            />
            <TextField
              label="Doctor Id"
            //   required
              fullWidth
              margin="normal"
              value={doctorId}
              type="text"
              onChange={(e) => {
                setDoctorId(e.target.value);
              }}
            />
            <TextField
              label="Room Id"
            //   required
              fullWidth
              margin="normal"
              value={roomId}
              type="text"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
             <InputLabel htmlFor="date">Admit Date</InputLabel>
            <TextField
              required
              fullWidth
              value={admitDate}
              type="date"
              onChange={(e) => {
                setAdmitDate(e.target.value);
              }}
            />
             <InputLabel htmlFor="date">Dischared Date</InputLabel>
            <TextField
              required
              fullWidth
              value={dischargedDate}
              type="date"
              onChange={(e) => {
                setDischargedDate(e.target.value);
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

export default InpatientRoomHistoryAdmin;
