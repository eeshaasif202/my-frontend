import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Patienthealthecord.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";


const PatientRecord = () => {
    const [patient, setPatient] = useState([]);
    const [medicine, setMedicine] = useState([]);
    const [symptops, setSymptom] = useState([]);
    const [preventions, setPrevention] = useState([]);
    const [observations, setObservation] = useState([]);

    const token = sessionStorage.getItem("access_token");
    const headers = {
      Authorization: "Bearer " + token, // Replace with your access token
    };
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/getPatients",
          {
            headers: headers, // Include the headers in the request
          }
        );
        setPatient(response.data); // Assuming the response contains an array of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    console.log("Patient", patient);
    useEffect(() => {
      fetchPatient();
    }, []);
  
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/medicines/get/record",
          {
            headers: headers, // Include the headers in the request
          }
        );
        setMedicine(response.data); // Assuming the response contains an array of hospitals
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    const fetchPreventions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/prevention/get/record",
          {
            headers: headers, // Include the headers in the request
          }
        );
        setPrevention(response.data); // Assuming the response contains an array of hospitals
      } catch (error) {
        console.error("Error fetching prevention:", error);
      }
    };
    const fetchObservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/observation/get/record",
          {
            headers: headers, // Include the headers in the request
          }
        );
        setObservation(response.data); // Assuming the response contains an array of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/symptoms/get/record",
          {
            headers: headers, // Include the headers in the request
          }
        );
        setSymptom(response.data); // Assuming the response contains an array of hospitals
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };
  
    useEffect(() => {
      fetchMedicine();
      fetchObservations();
      fetchPreventions();
      fetchSymptoms();
    }, []);
  
  
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
                <a href="/health">Health Record</a>
              </li>
              <li>
                <a href="/viewhospitals">View Hospitals</a>
              </li>
              </ul>
            </div>
          </div>
          <div className="D_containerright">
            <h4>Doctor Panel</h4>
            <h2>Patient Health Record</h2>
            <h3 style={{marginTop:'2rem'}}> Observation</h3>
            <div className="Patient_health_record_data">
              <table>
                <thead>
                  <tr>
                    <th>Patient Id</th>
                    <th>Description </th>
                  </tr>
                </thead>
                <tbody>
                  {observations?.map((observation) => (
                    <tr key={observation.id}>
                      <td>{observation.patientId}</td>
                      <td>{observation.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h3>Symptoms</h3>
            <div className="Patient_health_record_data">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description </th>
                    <th>Frequency </th>
                  </tr>
                </thead>
                <tbody>
                  {symptops?.map((symptops) => (
                    <tr key={symptops.id}>
                      <td>{symptops.name}</td>
                      <td>{symptops.description}</td>
                      <td>{symptops.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h3>Medicines</h3>
            <div className="Patient_health_record_data">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description </th>
                    <th>Instructions </th>
                  </tr>
                </thead>
                <tbody>
                  {medicine?.map((medicine) => (
                    <tr key={medicine.id}>
                      <td>{medicine.name}</td>
                      <td>{medicine.description}</td>
                      <td>{medicine.instructionsForUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h3>Prevention</h3>
            <div className="Patient_health_record_data">
              <table>
                <thead>
                  <tr>
                    <th>Description </th>
                    <th>How Often</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {preventions?.map((preventions) => (
                    <tr key={preventions.id}>
                      <td>{preventions.description}</td>
                      <td>{preventions.howOften}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default PatientRecord