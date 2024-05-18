import React, { useEffect, useState } from "react";
import "./SystemAdminDashboard.css";
import hcp_logo from "../Assets/hcpLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SystemAdminDashboard = () => {
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
          <div className="D_date-display">Date : 18-December-2023</div>

          <div className="D_user-info">
            <div className="logo">
              {/* <img src={hcp_logo} alt="" /> */}
              <span>System Admin</span>
            </div>

            <span>SystemAdmin@au.edu.pk</span>

            <button type="button">Log out</button>
          </div>
          <hr></hr>
          <div className="D_navigation">
            <ul>
              <li>
                <a href="/sytemadmin">Home</a>
              </li>
              <li>
                <a href="viewhospitals">View Hospitals</a>
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
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
