import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const MyAppointment = () => {

    const { user } = useContext(AuthContext);


    const [appointments, setAppointments] = useState([])

    // useEffect(() => {
    //     fetch(`https://doctors-portal-server-taupe.vercel.app/bookings?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setAppointments(data))
    // }, [user?.email])



    //used react query for fetching the booking data by user email and send to token to server side for verification
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-taupe.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })



    return (
        <div>
            <h3 className='text-3xl mb-10 text-center text-green-600 mt-6'>{bookings?.length} {bookings.length > 1 ? "Bookings" : 'Booking'} For {user?.email}</h3>

            <div className="overflow-x-auto mb-24">
                <table className="table w-full sm:w-full md:w-full lg:w-3/4 mx-auto">

                    <thead className=''>
                        <tr className='dark:text-white text-center border-2'>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>No</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Booked For</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Patient Name</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Booking Date</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Time</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Price</th>
                            <th className='dark:bg-slate-800 border-2 dark:border-green-600'>Payment</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-black'>
                        {/* {
                            bookings?.map((booking, index) => <tr key={index} className='dark:text-white'>
                                <th className='dark:bg-gray-700 border-1 border-black text-center'>{index + 1}</th>
                                <th className='dark:bg-gray-700 border-1 border-black text-center'>{booking.treatment}</th>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.patient}</td>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.appointmentDate}</td>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.slot}</td>
                            </tr>)
                        } */}


                        {
                            bookings &&
                            bookings?.map((booking, index) => <tr key={index} className='dark:text-white'>
                                <th className='dark:bg-gray-700 border-1 border-black text-center'>{index + 1}</th>
                                <th className='dark:bg-gray-700 border-1 border-black text-center'>{booking.treatment}</th>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.patient}</td>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.appointmentDate}</td>
                                <td className='dark:bg-gray-700 border-1 border-black text-center'>{booking.slot}</td>
                                <td className='dark:bg-gray-700 border-1 border-black text-center font-bold'>{booking?.price ? booking.price + ' Taka' : 'Not Added'}</td>

                                <td className='dark:bg-gray-700 border-1 border-black text-center'>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn btn-primary btn-sm px-6 dark:bg-blue-800 dark:border-0 dark:text-white'>Pay</button>
                                        </Link>
                                    }

                                    {
                                        booking.price && booking.paid && <span className='font-bold bg-green-600 rounded-md px-6 py-1 text-white'>Paid</span>
                                    }
                                </td>


                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;
