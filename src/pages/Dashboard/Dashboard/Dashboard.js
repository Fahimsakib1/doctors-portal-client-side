import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import BookingTable from './BookingTable';

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [user?.email])


    return (
        <div className='mx-auto'>

            <h1 className='text-2xl text-center mt-10 mb-8 text-blue-600'>{appointments?.length} Booking For {user?.email}</h1>
            
            <div className="overflow-x-auto w-1/2 mx-auto mb-24">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Booked For</th>
                            <th>Patient Name</th>
                            <th>Booking Date</th>
                            <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map(appointment => <BookingTable appointment={appointment} key={appointment._id}></BookingTable>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Dashboard;