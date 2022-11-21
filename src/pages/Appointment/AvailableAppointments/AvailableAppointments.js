import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Spinner from '../../Shared/Loading/Spinner';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';



const AvailableAppointments = ({ selectedDate }) => {

    //const [appointmentOptions, setAppointmentOptions] = useState([]);

    const [treatment, setTreatment] = useState(null);

    const date = format(selectedDate, 'PP')


    //getting all the appointment option data from database through server by react query
    const {data : appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`https://doctors-portal-server-taupe.vercel.app/appointmentOptions?date=${date}`)
        .then(res => res.json())
    })

    // if(isLoading){
    //     return <Spinner></Spinner>
    // }


    //react query using async await
    // const {data: appointmentOptions = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: async() => {
    //         const res = await fetch('https://doctors-portal-server-taupe.vercel.app/appointmentOptions')
    //         const data = await res.json()
    //         return data;
    //     }
    // })

    
    //getting all the appointment option data from database through server by fetching
    // useEffect(() => {
    //     fetch('https://doctors-portal-server-taupe.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])



    return (
        <section className='mt-24'>
            <p className='text-center text-primary font-semibold text-xl dark:px-16 dark:py-4 dark:border-2 dark:border-blue-800 dark:rounded-lg dark:sm:w-full dark:md:w-3/4 dark:lg:w-1/2 dark:w-3/4 dark:mx-auto dark:'>Available Appointments On {format(selectedDate, 'PP')}</p>

            {
                isLoading && <Spinner></Spinner>
            }

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption key={appointmentOption._id}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>

            {
                treatment &&
                <BookingModal treatment={treatment} setTreatment ={setTreatment} selectedDate={selectedDate}
                refetch={refetch}>
                </BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;