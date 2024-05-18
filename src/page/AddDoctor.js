import React from 'react'

const AddDoctor = () => {
  return (
    <div>
    <div className='D_maincontainer'>

        <div className='D_containerleft'>


            <div className="D_date-display">
            Date:  14-May-2024
            </div>

            <div className="D_user-info">

                <span>Admin</span>
                <span>admin@au.edu.pk</span>
                <a href='/login'>

                    <button type="button">Log out</button>
                </a>
            </div>

            <div className="D_navigation">
            <ul>
            <li><a href="/admin">Home</a></li>
            <li><a href="/hospitals">Hospitals</a></li>
            <li><a href="/inpatientroomsadmin">Inpatients Rooms</a></li>
            <li><a href="/inpatientroomhistoryadmin">Inpatient Room History</a></li>
            <li><a href="/addroomsadmin">Add Room</a></li>
            <li><a href="/doctorappointmenthistoryadmin">Doctor Appointments History</a></li>
            <li><a href="/addDoctor">Add Doctor</a></li>
</ul>
            </div>
        </div>
        <div className='D_containerright'>

            <h4>Admin Panel</h4>
            <h2>
                Add Doctor Form
            </h2>
            <br></br>
            <div className="D_search-bar">
                <input type="text" placeholder='Search Bar' />
                <button type="button">Search</button>
            </div>
            
            <div className='Patient_health_record_data'>

                <div className='addappointmentform'>
                    
                    <form>
                    <h3>
                Fill Appointment Form
            </h3>
                        <div className='inputs' >

                         
                        </div>
                        <div className='inputs'>
                            <label>User Id</label>
                            <input type='number' placeholder='Enter user Id '></input>
                        </div>
                        <div className='inputs'>
                            <label>Address</label>
                            <input type='text' placeholder='Enter Doctor name '></input>
                        </div>
                        <div className='inputs'>
                            <label>Father Name</label>
                            <input type='text' placeholder='Enter Father Name '></input>
                        </div>
                        <div className='inputs'>
                            <label>Age</label>
                            <input type='number' placeholder='Enter age'></input>
                        </div>
                        <div className='inputs'>
                            <label>Hospital Id</label>
                            <input type='number' placeholder='Enter Hospital Id '></input>
                        </div>
                        <div className='inputs'>
                            <label>Hospital Name</label>
                            <input type='text' placeholder='Enter Hospital Name '></input>
                        </div>
                        <div className='inputs'>
                            <label>Department Id</label>
                            <input type='number' placeholder='Enter department Id'></input>
                        </div>
                        
                        <div className='inputs'>
                            <label>Department Name</label>
                            <input type='text' placeholder='Enter department Name'></input>
                        </div>






                    </form>
                    <div className='submitbedform'>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>
                </div>

                <div className='Button'>
                    <button className='add'>
                        Add
                    </button>
                    <button className='edit'>
                        Edit
                    </button>
                    <button className='delete'>
                        Delete
                    </button>
                </div>
            </div>



        </div>
    </div>


</div>
  )
}

export default AddDoctor
