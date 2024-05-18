import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './page/Dashboard';
import Loginsignup from './page/Loginsignup';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import PatientDashboard from './Components/Patient/PatientDashboard';
import Appointments from './page/Appointments';
import Sessions from './page/Sessions';
import Patienthealthrecord from './page/Patienthealthrecord';
import Rooms from './page/Rooms';
import Patientstest from './page/Patientstest';
import Inpatientrooms from './page/Inpatientrooms';
import InpatientsRoomHistory from './page/InpatientsRoomHistory';
import Addrooms from './page/Addrooms';
import AddAppointment from './page/AddAppointment';
import DoctorHistory from './page/DoctorHistory';
import Hospitals from './page/Hospitals';
import AddRoomsAdmin from './page/AddRoomsAdmin';
import InpatientRoomHistoryAdmin from './page/InpatientRoomHistoryAdmin';
import InpatientRoomsAdmin from './page/InpatientRoomsAdmin';
import AddDoctor from './page/AddDoctor';
import DoctorAppointmentHistoryAdmin from './page/DoctorAppointmentHistoryAdmin';
import ProtectedRouteWrapper from './auth/ProtectedRouteWrapper';
import PatientRecord from './page/PatientRecord';
import PatientHospital from './page/PatientHospital';
import SystemAdmin from './page/SystemAdmin';
import ViewHospitalsSA from './page/ViewHospitalsSA';
import RegisterHospitalSA from './page/RegisterHospitalSA';
import SystemAdminHome from './page/SystemAdminHome';
import IcuReservation from './page/IcuReservation';
import IcuReservationRequest from './page/IcuReservationRequest';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Loginsignup />} />
      <Route path="/sytemadminhome" element={<SystemAdminHome />}></Route>
      {/* <Route path="/systemadmin" element={<SystemAdmin />}></Route> */}
      <Route path="/registerhospital" element={<RegisterHospitalSA />}></Route>
      <Route path="/viewhospitalssystemadmin" element={<ViewHospitalsSA/>}></Route>
        {/* <Route path="/registerhospital"><RegisterHospitalSA/></Route> */}
      {/* <Route path="/registerhospital"exact element={<ProtectedRouteWrapper allowedRoles={['systemadmin']}><RegisterHospitalSA/></ProtectedRouteWrapper>}/>
        <Route path="/viewhospitals"exact element={<ProtectedRouteWrapper allowedRoles={['systemadmin']}><ViewHospitalsSA/></ProtectedRouteWrapper>}/> */}
      <Route path="/systemadmin" exact element={<ProtectedRouteWrapper allowedRoles={['systemadmin']}><SystemAdmin/></ProtectedRouteWrapper>}/>
      <Route path="/icureservation" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><IcuReservation/></ProtectedRouteWrapper>}/>
        <Route path="/icureservationrequest" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><IcuReservationRequest/></ProtectedRouteWrapper>}/>
      <Route path="/admin" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><Dashboard /></ProtectedRouteWrapper>} />
      <Route path="/login" exact element={<Loginsignup />} />
      <Route path="/doctor" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRouteWrapper>} />
      <Route path="/patient" exact element={<ProtectedRouteWrapper allowedRoles={['doctor', 'patient']}><PatientDashboard /></ProtectedRouteWrapper>} />
      <Route path="/appointments" exact element={<ProtectedRouteWrapper allowedRoles={['doctor', 'patient']}><Appointments /></ProtectedRouteWrapper>} />
      <Route path="/sessions" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><Sessions /></ProtectedRouteWrapper>} />
      <Route path="/patienthealthrecord" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><Patienthealthrecord /></ProtectedRouteWrapper>} />
      <Route path="/rooms" exact element={<ProtectedRouteWrapper><Rooms /></ProtectedRouteWrapper>} />
      <Route path="/patientstest" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><Patientstest /></ProtectedRouteWrapper>} />
      <Route path="/health" exact element={<ProtectedRouteWrapper allowedRoles={['doctor', 'patient']}><PatientRecord /></ProtectedRouteWrapper>} />
      <Route path="/viewhospitals" exact element={<ProtectedRouteWrapper allowedRoles={['doctor', 'patient']}><PatientHospital /></ProtectedRouteWrapper>} />
      <Route path="/inpatientrooms" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><Inpatientrooms /></ProtectedRouteWrapper>} />
      <Route path="/inpatientroomhisory" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><InpatientsRoomHistory /></ProtectedRouteWrapper>} />
      <Route path="/addrooms" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><Addrooms /></ProtectedRouteWrapper>} />
      <Route path="/addappointment" exact element={<ProtectedRouteWrapper allowedRoles={['doctor', 'patient']}><AddAppointment /></ProtectedRouteWrapper>} />
      <Route path="/doctorappointmenthistory" exact element={<ProtectedRouteWrapper allowedRoles={['doctor']}><DoctorHistory /></ProtectedRouteWrapper>} />
      <Route path="/hospitals" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><Hospitals /></ProtectedRouteWrapper>} />
      <Route path="/addroomsadmin" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><AddRoomsAdmin /></ProtectedRouteWrapper>} />
      <Route path="/inpatientroomhistoryadmin" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><InpatientRoomHistoryAdmin /></ProtectedRouteWrapper>} />
      <Route path="/inpatientroomsadmin" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><InpatientRoomsAdmin /></ProtectedRouteWrapper>} />
      <Route path="/doctorappointmenthistoryadmin" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><DoctorAppointmentHistoryAdmin /></ProtectedRouteWrapper>} />
      <Route path="/addDoctor" exact element={<ProtectedRouteWrapper allowedRoles={['admin']}><AddDoctor /></ProtectedRouteWrapper>} />
        </Routes>
        </BrowserRouter>
        </>
  
  );
}

export default App;