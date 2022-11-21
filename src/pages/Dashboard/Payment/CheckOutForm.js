import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import Spinner from '../../Shared/Loading/Spinner';


const CheckOutForm = ({ booking }) => {

    const { price, email, treatment, patient, phone, _id } = booking;


    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('');

    const [clientSecret, setClientSecret] = useState("");


    //const [successfulPayment, setSuccessfulPayment] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [paymentConfirmError, setPaymentConfirmError] = useState('')

    const [completePayment, setCompletePayment] = useState(true);
    const [buttonName, setButtonName] = useState('Pay');


    useEffect(() => {

        fetch("https://doctors-portal-server-taupe.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });

    }, [booking]);



    const handleSubmit = async (event) => {

        event.preventDefault();

        setTransactionId('');

        //jodi stripe and element er j kono 1 tao na thake tahole return hoye jabe..
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            console.log("Error", error)
            setCardError(error);
        }
        else {
            setCardError('');
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setPaymentConfirmError(confirmError.message)
            return;
        }

        console.log("Payment Intent", paymentIntent)

        if (paymentIntent.status === "succeeded") {

            //setTransactionId(paymentIntent.id)
            //setCompletePayment(false);
            //setButtonName('Paid');
            
            const payment = {
                price: price,
                transactionId: paymentIntent.id,
                email: email,
                paymentBy: patient,
                bookingId: _id
            }
            
            
            //store payment info in database
            fetch('https://doctors-portal-server-taupe.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    // Swal.fire(
                    //     'Successful',
                    //     `${patient} your payment of ${price} Taka is successful for ${treatment}`,
                    //     'success'
                    // )
                    setTransactionId(paymentIntent.id);
                    setCompletePayment(false);
                    setButtonName('Paid');
                    toast.success('Payment Information Added To Database');
                    
                }
            
            })
        }

    }
    


    return (
        <>
            <form
                className='w-[320px] md:w-[550px] sm:w-[340px] my-8 mx-auto border-2 py-6 px-2 rounded-md border-blue-600'
                onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'blue',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <div className='mx-auto text-center'>
                    <button className='btn btn-sm bg-blue-700 border-0 text-white font-bold mt-4 px-10' type="submit" disabled={!stripe || !clientSecret || !completePayment}>
                        {buttonName}
                    </button>
                </div>

                {
                    cardError ?
                        <>
                            <p className='text-red-600 text-center mt-2'>{cardError.message} Try Again..</p>
                        </>
                        :
                        <>
                            <p className='text-red-600 text-center mt-2'>{paymentConfirmError}</p>
                        </>

                }

                {/*                 
                {
                    paymentConfirmError &&
                    <>
                        <p className='text-red-600 text-center mt-2'>{paymentConfirmError}</p>
                    </>
                } */}
            </form>

            <>
                {
                    transactionId &&
                    <div className=''>
                        <h1 className='text-lg  font-semibold text-center'>{patient} Your Payment is <span className='text-green-600 font-semibold text-2xl'>Successful</span> For {treatment}</h1>
                        <h2 className='text-md text-center font-semibold'>Transaction ID: <span className='font-bold text-green-600'>{transactionId}</span></h2>
                    </div>
                }
            </>
        </>
    );
};

export default CheckOutForm;