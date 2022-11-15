import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';



const AvailableAppointments = ({ selectedDate }) => {

    //const [appointmentOptions, setAppointmentOptions] = useState([]);

    const [treatment, setTreatment] = useState(null);

    const date = format(selectedDate, 'PP')


    //getting all the appointment option data from database through server by react query
    const {data : appointmentOptions = [] } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
        .then(res => res.json())
    })




    //react query using async await

    // const {data: appointmentOptions = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: async() => {
    //         const res = await fetch('http://localhost:5000/appointmentOptions')
    //         const data = await res.json()
    //         return data;
    //     }
    // })

    
    //getting all the appointment option data from database through server by fetching
    // useEffect(() => {
    //     fetch('http://localhost:5000/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])



    return (
        <section className='mt-24'>
            <p className='text-center text-primary font-semibold text-xl'>Available Appointments On {format(selectedDate, 'PP')}</p>

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
                <BookingModal treatment={treatment} setTreatment ={setTreatment} selectedDate={selectedDate}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;