import React from 'react'

const AddRoomsAdmin = () => {
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
                Add Rooms
            </h2>
            <div className="D_search-bar">
                <input type="text" placeholder="Search by patient id " />
                <button type="button">Search</button>
            </div>
            
            <div className='Patient_health_record_data'>

                <div className='addroomform'>
                    
                    <form>
                    <h3>
                Fill Form
            </h3>
                        <div className='inputs' >

                            <label>Select</label>
                            <select >
                                <option className='inputs'>
                                    Room
                                </option >
                                <option className='inputs'>
                                    ICU
                                </option>
                            </select>
                        </div>
                        <div className='inputs'>
                            <label>Department Id</label>
                            <input type='text' placeholder='Enter Department Id '></input>
                        </div>
                        <div className='inputs'>
                            <label>No of Beds</label>
                            <input type='number' placeholder='Beds '></input>
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

export default AddRoomsAdmin
