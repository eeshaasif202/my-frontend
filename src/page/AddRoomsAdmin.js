import axios from "axios";
import React, { useState } from "react";

const AddRoomsAdmin = () => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [noOfBeds, setNoOfBeds] = useState(null);
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const handleSubmit = async () => {
    const formData = {
      name,
      noOfBeds,
      departmentId: { id: departmentId }, // Assuming cityId needs an object structure
    };
    try {
      await axios.post("http://localhost:8080/room", formData, {
        headers,
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
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
          <h2>Add Rooms</h2>
          <div className="D_search-bar">
            <input type="text" placeholder="Search by patient id " />
            <button type="button">Search</button>
          </div>

          <div className="Patient_health_record_data">
            <div className="addroomform">
              <form onSubmit={handleSubmit}>
                <h3>Fill Form</h3>
                <div className="inputs">
                  <label>Select</label>
                  <select
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option value="">Select Room</option>
                    <option className="inputs" value={"Room"}>
                      Room
                    </option>
                    <option className="inputs" value={"ICU"}>
                      ICU
                    </option>
                  </select>
                </div>
                <div className="inputs">
                  <label>Department Id</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Department Id "
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  ></input>
                </div>
                <div className="inputs">
                  <label>No of Beds</label>
                  <input
                    required
                    type="number"
                    placeholder="Beds "
                    value={noOfBeds}
                    onChange={(e) => setNoOfBeds(e.target.value)}
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

export default AddRoomsAdmin;
