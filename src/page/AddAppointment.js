import React, { useState } from "react";
import "./Appointment.css";
import axios from "axios";

const AddAppointment = () => {
  const [patientId, setPatientId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [approvedBy, setApprovedBy] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("");
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorId: { id: doctorId },
      patientId: { id: patientId },
      approvedBy: null,
      status,
      startTime,
      endTime,
      createdAt,
      appointmentDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/appointment",
        formData,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setApprovedBy(null);
        setCreatedAt(null);
        setDoctorId(null);
        setEndTime(null);
        setPatientId(null);
        setStartTime(null);
        setAppointmentDate(null);
        setStatus(null);
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
       

          <div className="D_user-info">
            <span>Patient</span>
            
            <a href="/login">
              <button type="button">Log out</button>
            </a>
          </div>

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
        <div className="D_containerright">
          <h4>Patient Panel</h4>
          <h2>Appointment Form</h2>
          <br></br>

          <div className="Patient_health_record_data">
            <div className="addappointmentform">
              <form onSubmit={handleSubmit}>
                <h3>Fill Appointment Form</h3>
                <div className="inputs"></div>
                <div className="inputs">
                  <label>Doctor Id</label>
                  <input
                    type="number"
                    placeholder="Enter Doctor Id "
                    value={doctorId}
                    onChange={(e) => {
                      setDoctorId(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="inputs">
                  <label>Doctor Name</label>
                  <input type="text" placeholder="Enter Doctor name "></input>
                </div>
                <div className="inputs">
                  <label>Patient Id</label>
                  <input
                    type="number"
                    placeholder="Enter Patient Id "
                    value={patientId}
                    onChange={(e) => {
                      setPatientId(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="inputs">
                  <label>Created At</label>
                  <input
                    type="date"
                    placeholder="Enter date of appontment creation"
                    value={createdAt}
                    onChange={(e) => {
                      setCreatedAt(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="inputs">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    placeholder="Enter date of appontment"
                    value={appointmentDate}
                    onChange={(e) => {
                      setAppointmentDate(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="inputs">
                  <label>Start Time</label>
                  <input
                    type="text"
                    placeholder="Enter start Time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="inputs">
                  <label>End Time</label>
                  <input
                    type="text"
                    placeholder="Enter End Time "
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="submitbedform">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
