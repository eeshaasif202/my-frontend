import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import hcp_logo from '../Assets/hcpLogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [oppointment, setOppointment] = useState([]);
  const [booking, setBooking] = useState([]);
  const [count, setCount] = useState([]);
  const [complete, setComplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [pending, setPending] = useState([]);
  const [incomplete, setInComplete] = useState([]);
    const token = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: "Bearer " + token, // Replace with your access token
  };
  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/count", {
        headers: headers, // Include the headers in the request
      });
    setCount(response.data); 
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };
  const fetchOppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/appointment/get", {
        headers: headers, // Include the headers in the request
      });
      const appointments = response.data;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Filter appointments for today's date
    const appointmentsToday = appointments.filter(appointment => {
      return appointment.appointmentDate.slice(0, 10) === today;
    });
    const newBooking = appointments.filter(appointment => {
      return appointment.createdAt.slice(0, 10) === today;
    });

    const completeAppointments = appointments.filter(appointment => appointment.status?.toLowerCase() === 'complete');
    const inProgressAppointments = appointments.filter(appointment => appointment.status?.toLowerCase() === 'inprogress');
    const pendingAppointments = appointments.filter(appointment => appointment.status?.toLowerCase() === 'pending');
    const incompleteAppointments = appointments.filter(appointment => appointment.status?.toLowerCase() === 'incomplete');

    setComplete(completeAppointments);
    setInProgress(inProgressAppointments);
    setPending(pendingAppointments);
    setInComplete(incompleteAppointments);

    setBooking(newBooking);
    setOppointment(appointmentsToday); 
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };
  console.log(oppointment)
  useEffect(() => {
    fetchOppointments();
    fetchUserCount();
  }, []);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('role');
          navigate("/login");
        
    } catch (error) {
        // Handle login error (e.g., show an error message)
        console.error('Logout failed:', error);
    }
};
  return (
    <div>

      <div className='D_maincontainer'>

        <div className='D_containerleft'>


        
         
          <div className="D_user-info">
          <div className='logo'>
            <img src={hcp_logo} alt="" />
            <span>Admin</span>
          </div>
            
          

            <button type="button" onClick={handleLogout}>Log out</button>
          </div>
             <hr></hr>
          <div className="D_navigation">
            <ul>
            <li><a href="/admin">Home</a></li>
              <li><a href="/hospitals">Hospitals</a></li>
              <li><a href="/inpatientroomsadmin">Rooms</a></li>
              <li><a href="/inpatientroomhistoryadmin">Inpatient Room History</a></li>
              <li><a href="/addroomsadmin">Add Room</a></li>
              <li><a href="/doctorappointmenthistoryadmin">Doctor Appointments History</a></li>
              {/* <li><a href="/addDoctor">Add Doctor</a></li> */}
            </ul>

          </div>
        </div>
        <div className='D_containerright'>
          <div className="D_search-bar">
            <input type="text" placeholder="Search Doctor name or Email" />
            <a href='/login'>

              <button type="button">Search</button>
            </a>
          </div>
          <h4>Status</h4>
          <div className='D_status' >

            <div className='D_status-container'>
              <div className='D_statusitem' id='item1' ><h4>{count.doctor}</h4><h5>Doctor</h5></div>
              <div className='D_statusitem' id='item2' ><h4>{count.patient}</h4><h5>Patient</h5></div>
              <div className='D_statusitem' id='item3' ><h4>{booking.length}</h4><h5>New Booking</h5></div>
              <div className='D_statusitem' id='item4' ><h4>{oppointment.length}</h4><h5>Today Session</h5></div>

            </div>
          
          </div>
          <h4>Appointment Status</h4>
          <div className='D_status' >

<div className='D_status-container'>
  <div className='D_statusitem' id='item1' ><h4>{complete.length}</h4><h5>Complete</h5></div>
  <div className='D_statusitem' id='item2' ><h4>{inProgress.length}</h4><h5>In Progress</h5></div>
  <div className='D_statusitem' id='item3' ><h4>{pending.length}</h4><h5>Pending</h5></div>
  <div className='D_statusitem' id='item4' ><h4>{incomplete.length}</h4><h5>Incomplete</h5></div>

</div>
</div>

          
        </div>
      </div>
    </div>
  )
}

export default Sidebar