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

const Patienthealthrecord = () => {
  const [patient, setPatient] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [symptops, setSymptom] = useState([]);
  const [preventions, setPrevention] = useState([]);
  const [observations, setObservation] = useState([]);
  const [openSymptoms, setOpenSymptoms] = useState(false);
  const [openMedicines, setOpenMedicines] = useState(false);
  const [openPreventions, setOpenPreventions] = useState(false);
  const [openObservations, setOpenObservations] = useState(false);
  const [formMed, setFormMed] = useState({
    name: '',
    description: '',
    instructionsForUse: '', 
    patientId: '',
  });
  
  const [formObs, setFormObs] = useState({
    description: '',
    patientId: '',
  });
  
  const [formPrev, setFormPrev] = useState({
    howOften: '',
    description: '',
    patientId: '',
  });
  
  const [formSym, setFormSym] = useState({
    name: '',
    description: '',
    frequency: '',
    patientId: '',
  });
  
  const [formMode, setMode] = useState("Add");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
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
        `http://localhost:8080/medicines/get/${selectedPatientId}`,
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
        `http://localhost:8080/prevention/get/${selectedPatientId}`,
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
        `http://localhost:8080/observation/get/${selectedPatientId}`,
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
        `http://localhost:8080/symptoms/get/${selectedPatientId}`,
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
    setFormObs({ ...formObs, patientId: selectedPatientId });
    setFormMed({ ...formMed, patientId: selectedPatientId });
    setFormPrev({ ...formPrev, patientId: selectedPatientId });
    setFormSym({ ...formSym, patientId: selectedPatientId });
  }, [selectedPatientId]);

  const handleMedSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "Add" && selectedPatientId) {
      try {
        await axios.post("http://localhost:8080/medicines", formMed, {
          headers,
        });
        fetchMedicine();
        handleClose();
      } catch (error) {
        console.error("Error adding medicines:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/medicines", formMed, {
          headers,
        });
        fetchMedicine();
        handleClose();
      } catch (error) {
        console.error("Error updating medicines:", error);
      }
    }
  };
  
  const handleObsSubmit = async (e) => {
    e.preventDefault();

    if (formMode === "Add" && selectedPatientId) {
      try {
        await axios.post("http://localhost:8080/observation", formObs, {
          headers,
        });
        fetchObservations();
        handleClose();
        console.log(formObs);
      } catch (error) {
        console.error("Error adding observation:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/observation", formObs, {
          headers,
        });
        fetchObservations();
        handleClose();
      } catch (error) {
        console.error("Error updating observation:", error);
      }
    }
  };
  const handlePrevSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "Add" && selectedPatientId) {
      try {
        await axios.post("http://localhost:8080/prevention", formPrev, {
          headers,
        });
        fetchPreventions();
        handleClose();
      } catch (error) {
        console.error("Error adding prevention:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/prevention", formPrev, {
          headers,
        });
        fetchPreventions();
        handleClose();
      } catch (error) {
        console.error("Error updating prevention:", error);
      }
    }
  };
  const handleSymSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "Add" && selectedPatientId) {
      try {
        await axios.post("http://localhost:8080/symptoms", formSym, {
          headers,
        });
        fetchSymptoms();
        handleClose();
      } catch (error) {
        console.error("Error adding symptoms:", error);
      }
    } else if (formMode === "Update") {
      try {
        await axios.put("http://localhost:8080/symptoms", formSym, {
          headers,
        });
        fetchSymptoms();
        handleClose();
      } catch (error) {
        console.error("Error updating symptoms:", error);
      }
    }
  };

  const handleSymEdit = async (symptomId) => {
    setMode("Update");
    setOpenSymptoms(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/symptoms/${symptomId}`,
        {
          headers: headers,
        }
      );
      const data = response.data;
      const formData = {
        id: data.id,
        name: data.name,
        frequency: data.frequency,
        description: data.description,
        patientId: data.patientId,
      };
      setFormSym(formData);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };
  const handlePrevEdit = async (preventionId) => {
    setMode("Update");
    setOpenPreventions(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/prevention/${preventionId}`,
        {
          headers: headers,
        }
      );
      const data = response.data;
      const formData = {
        id: data.id,
        howOften: data.howOften,
        description: data.description,
        patientId: data.patientId,
      };
      setFormPrev(formData);
    } catch (error) {
      console.error("Error fetching prevention:", error);
    }
  };
  const handleMedEdit = async (medicineId) => {
    setMode("Update");
    setOpenMedicines(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/medicines/${medicineId}`,
        {
          headers: headers,
        }
      );
      const data = response.data;
      const formData = {
        id: data.id,
        name: data.name,
        instructionsForUse: data.instructionsForUse,
        description: data.description,
        patientId: data.patientId,
      };
      setFormMed(formData);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleObsEdit = async (observationId) => {
    setMode("Update");
    setOpenObservations(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/observation/${observationId}`,
        {
          headers: headers,
        }
      );
      const data = response.data; // Assuming the response contains an array of hospitals
      const formData = {
        id: data.id,
        description: data.description,
        patientId: data.patientId,
      };
      setFormObs(formData);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  // Function to handle deleting a oppointment
  const handleSymDelete = async (symptomId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/symptoms/${symptomId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchSymptoms();
      }
    } catch (error) {}
  };
  const handleMedDelete = async (medicineId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/medicines/${medicineId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchMedicine();
      }
    } catch (error) {}
  };
  const handleObsDelete = async (observationId) => {
    console.log(typeof(observationId))
    try {
      const response = await axios.delete(
        `http://localhost:8080/observation/${observationId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchObservations();
      }
    } catch (error) {}
  };
  const handlePrevDelete = async (preventionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/prevention/${preventionId}`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        fetchPreventions();
      }
    } catch (error) {}
  };
  const handleObsAdd = () => {
    setMode("Add");
    setOpenObservations(true);
  };

  const handleSymAdd = () => {
    setMode("Add");
    setOpenSymptoms(true);
  };

  const handleMedAdd = () => {
    setMode("Add");
    setOpenMedicines(true);
  };

  const handlePrevAdd = () => {
    setMode("Add");
    setOpenPreventions(true);
  };
  const handleClose = () => {
    setOpenMedicines(false);
    setOpenSymptoms(false);
    setOpenObservations(false);
    setOpenPreventions(false);
  };
  console.log(formObs);

  const handleClear = () => {};
  return (
    <div>
      <div className="D_maincontainer">
        <div className="D_containerleft">
          {/* <div className="D_date-display">Date:  14-May-2024</div> */}

          <div className="D_user-info">
            <span>Doctor</span>
            {/* <span>doctor@au.edu.pk</span> */}
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
          <h2>Patient Health Record</h2>
          <div className="D_search-bar">
            <select
              style={{ border: "2px solid #489ae7", borderRadius: "5px" }}
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
            >
              <option value="">Select Patient</option>
              {patient.map((patientData) => (
                <option key={patientData.id} value={patientData.id}>
                  {patientData.name} <p>Id: {patientData.id}</p>
                </option>
              ))}
            </select>
            <button
              style={{ fontSize: "1.3rem", marginLeft: "10px" }}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <h3>Observation</h3>
          <div className="Patient_health_record_data">
            <table>
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Description </th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {observations?.map((observation) => (
                  <tr key={observation.id}>
                    <td>{observation.patientId}</td>
                    <td>{observation.description}</td>
                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleObsEdit(observation.id)}>
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleObsDelete(observation.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="Button">
              <button className="add" onClick={handleObsAdd}>
                Add
              </button>
            </div>
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
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {symptops?.map((symptops) => (
                  <tr key={symptops.id}>
                    <td>{symptops.name}</td>
                    <td>{symptops.description}</td>
                    <td>{symptops.frequency}</td>
                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleSymEdit(symptops.id)}>
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleSymDelete(symptops.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="Button">
              <button className="add" onClick={handleSymAdd}>
                Add
              </button>
            </div>
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
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {medicine?.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.description}</td>
                    <td>{medicine.instructionsForUse}</td>
                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handleMedEdit(medicine.id)}>
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handleMedDelete(medicine.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="Button">
              <button className="add" onClick={handleMedAdd}>
                Add
              </button>
            </div>
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
                    <td>
                      {/* Edit and Delete buttons */}
                      <button onClick={() => handlePrevEdit(preventions.id)}>
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "1rem", backgroundColor: "red" }}
                        onClick={() => handlePrevDelete(preventions.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="Button">
              <button className="add" onClick={handlePrevAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openMedicines} onClose={() => setOpenMedicines(false)}>
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleMedSubmit}>
            {/* Replace with appropriate form fields for medicine data */}
            <TextField
              label="Medicine Name"
              required
              fullWidth
              value={formMed.name}
              margin="normal"
              type="text"
              onChange={(e) => setFormMed({ ...formMed, name: e.target.value })}
            />
            <TextField
              label="Description"
              required
              fullWidth
              value={formMed.description}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormMed({ ...formMed, description: e.target.value })
              }
            />
            <TextField
              label="Instructions for Use"
              required
              fullWidth
              value={formMed.instructionsForUse}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormMed({ ...formMed, instructionsForUse: e.target.value })
              }
            />
            {/* Add more fields as needed */}

            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenMedicines(false)}
              >
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
      <Dialog
        open={openObservations}
        onClose={() => setOpenObservations(false)}
      >
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleObsSubmit}>
            {/* Replace with appropriate form fields for medicine data */}
            <TextField
              label="Description"
              required
              fullWidth
              value={formObs.description}
              margin="normal"
              type="text"
              onChange={(e) => setFormObs({ ...formObs, description: e.target.value })}
            />

            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenObservations(false)}
              >
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

      <Dialog open={openPreventions} onClose={() => setOpenPreventions(false)}>
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handlePrevSubmit}>
            {/* Replace with appropriate form fields for medicine data */}
            <TextField
              label="How Often"
              required
              fullWidth
              value={formPrev.howOften}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormPrev({ ...formPrev, howOften: e.target.value })
              }
            />
            <TextField
              label="Description"
              required
              fullWidth
              value={formPrev.description}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormPrev({ ...formPrev, description: e.target.value })
              }
            />

            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenMedicines(false)}
              >
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

      <Dialog open={openSymptoms} onClose={() => setOpenSymptoms(false)}>
        <DialogTitle>{formMode}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSymSubmit}>
            {/* Replace with appropriate form fields for medicine data */}
            <TextField
              label="Name"
              required
              fullWidth
              value={formSym.name}
              margin="normal"
              type="text"
              onChange={(e) => setFormSym({ ...formSym, name: e.target.value })}
            />
            <TextField
              label="Description"
              required
              fullWidth
              value={formSym.description}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormSym({ ...formSym, description: e.target.value })
              }
            />
            <TextField
              label="Frequency"
              required
              fullWidth
              value={formSym.frequency}
              margin="normal"
              type="text"
              onChange={(e) =>
                setFormSym({ ...formSym, frequency: e.target.value })
              }
            />
            {/* Add more fields as needed */}

            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenMedicines(false)}
              >
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

export default Patienthealthrecord;
