import React, { useState } from 'react';
import { format } from 'date-fns';



const BookingModal = ({ treatment, setTreatment, selectedDate }) => {

    // console.log("Treatment values on Booking Modal Page", treatment.slots);

    const { name, _id, slots } = treatment;

    const date = format(selectedDate, 'PP');


    const handleBooking = (event) => {
        event.preventDefault();
        
        const treatmentName = name;
        const patientName = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const slot = event.target.slot.value;
        const bookedDate = date;


        const booking = {
            treatment: treatmentName,
            appointmentDate : date,
            slot: slot,
            patientName : patientName,
            email: email,
            phone: phone
        }

        // console.log(treatmentName, patientName, email, phone, slot, bookedDate);
        console.log(booking);
        event.target.reset();

        //send the booking object data to the server and once the data is sent then close the modal
        setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-2xl">{name}</h3>

                    <form onSubmit={handleBooking}>

                        <input type="text" value={format(selectedDate, 'PP')} disabled className="input input-bordered w-full mt-6 mb-3 bg-gray-300 font-semibold" />

                        <select name='slot' className="select select-bordered w-full my-3 ">
                            {
                                slots.map((slot, index) => <option key={index} value={slot} >{slot}</option>)
                            }
                        </select>

                        <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full my-3" required/>

                        <input type="email" name='email' placeholder="Email Address" className="input input-bordered w-full my-3" required/>

                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full my-3" required/>

                        <input type="submit" value="Submit" className='w-full bg-accent text-white text-xl py-2 rounded-md mt-4 mb-2' />
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;