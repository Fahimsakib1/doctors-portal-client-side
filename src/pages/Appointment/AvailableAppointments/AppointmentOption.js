import React from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {

    const { _id, name, slots, price } = appointmentOption;


    return (
        <div className='mt-24'>
            <div className="card  bg-base-100 shadow-xl mx-auto dark:bg-gray-800 md:w-96 sm:w-80 w-80">
                <div className="card-body">

                    <h2 className="text-primary font-semibold text-center text-2xl">{name}</h2>

                    <p className='text-center '>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>

                    <p className='text-center '> {slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>

                    <p className='text-center font-bold'>Price: {price} Taka</p>

                    <div className="card-actions justify-center">
                        {/* Modal Button */}
                        <label
                            disabled={slots.length === 0}
                            onClick={() => setTreatment(appointmentOption)}
                            htmlFor="booking-modal" className='btn btn-primary text-white dark:bg-black'>Book Appointment
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;