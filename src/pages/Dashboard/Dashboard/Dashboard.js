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
        <div className=''>

            <h1 className='text-2xl text-center mb-8 text-blue-600'>{appointments?.length} Booking For {user?.email}</h1>
            
            <div className="overflow-x-auto mb-24 w-3/4 mx-auto ">
                <table className="table w-full">

                    <thead className=''>
                        <tr className='dark:text-white text-center '>
                            <th className='dark:bg-slate-800'>Booked For</th>
                            <th className='dark:bg-slate-800'>Patient Name</th>
                            <th className='dark:bg-slate-800'>Booking Date</th>
                            <th className='dark:bg-slate-800'>Slot</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-black'>
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