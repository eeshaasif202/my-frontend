import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointment.css";

const Appointments = () => {
    const [oppointment, setOppointment] = useState([]);
    const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchOppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/appointment/patient", {
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
    <>
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
                <a href="/health">Health Record</a>
              </li>
              <li>
                <a href="/viewhospitals">View Hospitals</a>
              </li>
              </ul>
            </div>
          </div>
          <div className="Ap_containerright">
            <div className="Ap_welcome">
              <div className="Ap_welcome_text">
                <h1>Patient Profile</h1>
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
                          <th>Id</th>
                        <th>Doctor id</th>
                    <th>Patient id</th>
                    <th>Approved by</th>
                    <th>Created at</th>
                    <th>Status</th>
                    <th>Appointment Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
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
                      
                    </tr>
                  ))}
                      </tbody>
                    </table>

                    {/* <p>Add, Remove and Many features available in @Schedule section.</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <allAppointment /> */}
      </div>
    </>
  );
};

export default Appointments;
