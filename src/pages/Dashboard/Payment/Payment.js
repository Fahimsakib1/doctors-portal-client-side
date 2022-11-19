import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Spinner from '../../Shared/Loading/Spinner';
import CheckOutForm from './CheckOutForm';




const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
//console.log("Stripe Promise From Payment Page", stripePromise);



const Payment = () => {

    const booking = useLoaderData();
    const { treatment, appointmentDate, slot, patient, email, phone, price } = booking;

    //API theke data load korar shomoy jehetu ektu time lage shei jonno ekta spinner dekhay dibo
    // const navigation = useNavigation();
    // if(navigation.state === "loading"){
    //     return <Spinner></Spinner>
    // }



    return (
        <div>
            <h1 className='text-3xl text-center font-semibold text-green-600 my-4'>Payment Page</h1>

            <h3 className='text-2xl text-center font-bold text-blue-700 '> Payment For {treatment}</h3>
            <p className='text-center text-2xl my-2'>You Have To Pay <span className='font-bold'>{price} Taka</span> For Your Appointment on <span className='font-bold'>{appointmentDate}</span> and <span className='font-bold'>Time {slot}</span></p>

            <div className=''>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking = {booking} />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;