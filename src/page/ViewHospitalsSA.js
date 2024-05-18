import React, { useEffect, useState } from "react";
import SystemAdminDashboard from "../Components/SystemAdmin/SystemAdminDashboard.css";
// import hcp_logo from '../Assets/hcpLogo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewHospitalsSA = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [id, setId] = useState();
  const [hospital, setHospital] = useState();
  const handleGet = async (hospitalId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hospital/${hospitalId}`,
        {
          headers: headers,
        }
      );
      const data = response.data;
      setHospital(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
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
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
         

          <div className="D_user-info">
            <div className="logo">
              {/* <img src={hcp_logo} alt="" /> */}
              <span>SystemAdmin</span>
            </div>

           

            <button type="button" onClick={handleLogout}>Log out</button>
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
            <input
              value={id}
              type="text"
              placeholder="Search Hospitals"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <button type="button" onClick={() => handleGet(id)}>
              Search
            </button>
          </div>
          <div className="Ap_lowerleftcontainer">
            <div className="Ap_upcoming-appointments">
              <h2> Hospitals</h2>
              {/* <p>More details available in @Appointment section.</p> */}
              <table>
                <thead>
                  <tr>
                    <th>Hospital ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>City Id</th>
                    <th>City Name</th>
                    <th>Province Id</th>
                    <th>Province</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{hospital?.id}</td>
                    <td>{hospital?.name}</td>
                    <td>{hospital?.address}</td>
                    <td>{hospital?.phoneNo}</td>
                    <td>{hospital?.cityId?.id}</td>
                    <td>{hospital?.cityId?.name}</td>
                    <td>{hospital?.cityId?.provinceId?.id}</td>
                    <td>{hospital?.cityId?.provinceId?.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHospitalsSA;
