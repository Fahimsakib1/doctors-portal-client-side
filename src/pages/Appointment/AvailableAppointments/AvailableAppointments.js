import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {

    const [appointmentOptions, setAppointmentOptions] = useState([]);

    const [treatment, setTreatment] = useState(null);


    useEffect(() => {
        fetch('AppointmentOptions.json')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
    }, [])



    return (
        <section className='mt-24'>
            <p className='text-center text-primary font-semibold text-xl'>Available Appointments On {format(selectedDate, 'PP')}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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