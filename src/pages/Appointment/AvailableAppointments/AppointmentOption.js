import React from 'react';
import BookingModal from '../BookingModal/BookingModal';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {

    const { _id, name, slots } = appointmentOption;


    return (
        <div className='mt-24'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    
                    <h2 className="text-primary font-semibold text-center text-2xl">{name}</h2>
                    
                    <p className='text-center '>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                    
                    <p className='text-center '> {slots.length } {slots.length > 1 ? 'Spaces': 'Space'} Available</p>

                    <div className="card-actions justify-center">
                        {/* Modal Button */}
                        <label 
                        disabled = {slots.length === 0}
                        onClick={() => setTreatment(appointmentOption)}
                        htmlFor="booking-modal" className='btn btn-primary text-white'>Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;