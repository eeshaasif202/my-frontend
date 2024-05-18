import React from 'react'
import './DoctorDashboard.css'
import hcp_logo from '../Assets/hcpLogo.png'
import { useNavigate } from 'react-router-dom';


const DoctorDashboard = () => {
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
            <span>Doctor</span>
          </div>
                       
                    
                        <button type="button" onClick={handleLogout}>Log out</button>
                    </div>
                     <hr></hr>
                    <div className="D_navigation">
                        <ul>
                            <li><a href="/doctor">Home</a></li>
                            <li><a href="/sessions">Today Sessions</a></li>
                            <li><a href="/doctorappointmenthistory">Doctor Appointments</a></li>
                            <li><a href="/patienthealthrecord">Health Record</a></li>
                            <li><a href="/patientstest">Patient Tests</a></li>
                            <li><a href="/inpatientrooms">Rooms</a></li>
                            <li><a href="/inpatientroomhisory">InPatient Room History</a></li>
                            <li><a href="/addrooms">Add Rooms</a></li>
                            {/* <li><a href="/patient">Patients</a></li> */}
                        </ul>

                    </div>
                </div>
                <div className='D_containerright'>

                  
                    <div className='dr_welcome'>
                        <div className='dr_welcome_text'>

                            <h4>
                                Welcome 
                            </h4>
                            <h2> Doctor Panel</h2>

                            <br></br>
                            <div className="D_search-bar">
                                <input type="text" placeholder="Search Doctor name and sessions available" />
                                <button type="button">Search</button>
                            </div>
                        </div>


                    </div>
                    <div className='D_status' >


                    </div>

                    <div className='D_lowermaincontainer'>
                        <div className='D_lowerleftcontainer'>
                            <h4>
                                Status
                            </h4>
                            <div className='Dr_status-container'>

                                <div className='Dr_statusitem' id='item1' ><h4>1</h4><h5>Doctor</h5></div>
                                <div className='D_statusitem' id='item2' ><h4>2</h4><h5>Patient</h5></div>
                                <div className='D_statusitem' id='item3' ><h4>1</h4><h5>New Booking</h5></div>
                                <div className='D_statusitem' id='item4' ><h4>0</h4><h5>Today Session</h5></div>

                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard