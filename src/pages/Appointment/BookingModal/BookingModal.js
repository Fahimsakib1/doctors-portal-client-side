import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';



const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {

    // console.log("Treatment values on Booking Modal Page", treatment.slots);

    const { user } = useContext(AuthContext);


    const { name, _id, slots } = treatment;

    const date = format(selectedDate, 'PP');


    const handleBooking = (event) => {
        event.preventDefault();

        const treatmentName = name;
        const patient = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const slot = event.target.slot.value;
        const bookedDate = date;


        const booking = {
            treatment: treatmentName,
            appointmentDate: date,
            slot: slot,
            patient: patient,
            email: email,
            phone: phone
        }
        console.log("Booking modal data from booking Page", booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    console.log(data)
                    toast.success('Booking Added Successfully!')
                    //send the booking object data to the server and once the data is sent then close the modal
                    refetch();
                    setTreatment(null);
                    event.target.reset();
                }

                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: 'You cant book More For Today!'
                    })
                }

            })
            .catch(error => { console.log(error); })

    }



    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative dark:bg-gray-900 dark:border-2">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-2xl ">{name}</h3>

                    <form onSubmit={handleBooking}>

                        <input type="text" value={format(selectedDate, 'PP')} disabled className="input input-bordered w-full mt-6 mb-3 bg-gray-300 font-semibold dark:text-black" />

                        <select name='slot' className="select select-bordered w-full my-3 dark:text-black">
                            {
                                slots.map((slot, index) => <option key={index} value={slot} >{slot}</option>)
                            }
                        </select>

                        <input defaultValue={user?.displayName}
                            disabled
                            type="text" name='name' placeholder="Full Name" className="input input-bordered w-full my-3 font-semibold dark:text-black" required />

                        <input defaultValue={user?.email}
                            disabled
                            type="email" name='email' placeholder="Email Address" className="input input-bordered w-full my-3 font-semibold dark:text-black" required />

                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full my-3 dark:text-black" />

                        <input type="submit" value="Submit" className='w-full bg-accent text-white text-xl py-2 rounded-md mt-4 mb-2 dark:bg-green-700 dark:border-1' />
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;