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

const DoctorAppointmentHistoryAdmin = () => {
    const [oppointment, setOppointment] = useState([]);
  const [open, setOpen] = useState(false);
  const [formMode, setMode] = useState("Add");
  const [patientId, setPatientId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [approvedBy, setApprovedBy] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState('');
  const [id, setId] = useState(null);

  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchOppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/appointment/get", {
        headers: headers, // Include the headers in the request
      });
      setOppointment(response.data); // Assuming the response contains an array of hospitals
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  useEffect(() => {
    fetchOppointments();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: { id: doctorId },
      patientId: {id: patientId},
      approvedBy: { id: approvedBy },
      status,
      startTime,
      endTime,
      createdAt,
      appointmentDate
    };
    const formDataUpdate = {
      id,
      doctorId: { id: doctorId },
      patientId: {id: patientId},
      approvedBy: { id: approvedBy },
      status,
      startTime,
      endTime,
      createdAt,
      appointmentDate
    };
    if (formMode === "Add") {
      try {
        await axios.post("http://localhost:8080/appointment", formData, {
          headers,
        });
        fetchOppointments();
        handleClose();
      } catch (error) {
        console.error("Error adding appointment:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/appointment", formDataUpdate, {
          headers,
        });
        fetchOppointments();
        handleClose();
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    }
  };

  // Function to handle editing a oppointment
  const handleEdit = async (hospitalId) => {
    setId(hospitalId);
    setMode("Update");
    setOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/appointment/${hospitalId}`,
        {
          headers: headers,
        }
      );
      const data = response.data; // Assuming the response contains an array of hospitals
      setStatus(data.status); 
      setApprovedBy(data.approvedBy);
      setDoctorId(data.doctorId);
      setPatientId(data.patientId);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setCreatedAt(DateConverter(data.createdAt));
      setAppointmentDate(DateConverter(data.appointmentDate));
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  // Function to handle deleting a oppointment
  const handleDelete = async (hospitalId) => {
    try {
        const response = await axios.delete(
          `http://localhost:8080/appointment/${hospitalId}`,
          {
            headers: headers,
          }
        );
        if(response.status === 200) {
            fetchOppointments();
        }
    }
    catch (error) {

    }
  };
  const handleAdd = () => {
    setMode("Add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setApprovedBy(null);
    setCreatedAt(null);
    setDoctorId(null);
    setEndTime(null);
    setPatientId(null);
    setStartTime(null);
    setAppointmentDate(null)
    setStatus(null);
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
    const filteredRooms = oppointment.filter(
      (hospital) => hospital.id === parseInt(searchQuery)
    );
    setOppointment(filteredRooms);
  }

  useEffect(() => {
    if (searchQuery === "") {
      // Fetch hospitals only if the searchQuery meets the criteria (length > 1)
      fetchOppointments();
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
              {/* {/* <li>
                <a href="/addDoctor">Add Doctor</a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="D_containerright">
          <h4>Admin Panel</h4>
          <h2>Doctor Appointment History</h2>
          <div className="D_search-bar">
          <input type="text" placeholder="Search " value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="button" onClick={handleSearch}>Search</button>
          </div>

          <div className="Ap_lowerleftcontainer">
            <div className="Ap_upcoming-appointments">
              <h2> Appointment History</h2>
              {/* <p>More details available in @Appointment section.</p> */}
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Doctor id</th>
                    <th>Patient id</th>
                    <th>Approved by</th>
                    <th>Created at</th>
                    <th>Status</th>
                    <th>Appointment Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {oppointment.map((oppointment) => (
                    <tr key={oppointment.id}>
                      <td>{oppointment.id}</td>
                      <td>{oppointment.doctorId}</td>
                      <td>{oppointment.patientId}</td>
                      <td>{oppointment.approvedBy}</td>
                      <td>{DateConverter(oppointment.createdAt)}</td>
                      <td>{oppointment.status}</td>
                      <td>{DateConverter(oppointment.appointmentDate)}</td>
                      <td>{oppointment.startTime}</td>
                      <td>{oppointment.endTime}</td>
                      <td>
                        {/* Edit and Delete buttons */}
                        <button onClick={() => handleEdit(oppointment.id)}>
                          Edit
                        </button>
                        <button
                          style={{ marginLeft: "1rem", backgroundColor: "red" }}
                          onClick={() => handleDelete(oppointment.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Button">
            <button className="add" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Doctor Id"
              required
              fullWidth
              value={doctorId}
              margin="normal"
              type="text"
              onChange={(e) => {
                setDoctorId(e.target.value);
              }}
            />
            <TextField
              label="Patien Id"
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
              label=" Approved By"
              required
              fullWidth
              margin="normal"
              value={approvedBy}
              type="text"
              onChange={(e) => {
                setApprovedBy(e.target.value);
              }}
            />
            <InputLabel htmlFor="date">Created At</InputLabel>
            <TextField
              required
              fullWidth
              value={createdAt}
              type="date"
              onChange={(e) => {
                setCreatedAt(e.target.value);
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
            <InputLabel htmlFor="date">Appointment Date</InputLabel>
            <TextField
              required
              fullWidth
              value={appointmentDate}
              type="date"
              onChange={(e) => {
                setAppointmentDate(e.target.value);
              }}
            />
            <InputLabel htmlFor="date">Start time</InputLabel>
            <TextField
              required
              fullWidth
              value={startTime}
              type="text"
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
            <InputLabel htmlFor="date">End time</InputLabel>
            <TextField
              required
              fullWidth
              value={endTime}
              type="text"
              onChange={(e) => {
                setEndTime(e.target.value);
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

export default DoctorAppointmentHistoryAdmin;
