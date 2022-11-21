import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2'
import SmallSpinner from '../../components/SmallSpinner/SmallSpinner';


const Review = () => {

    const [addReview, setAddReview] = useState(false);
    
    
    //get doctors Name from the server side
    const { data: allDoctors = [], isLoading } = useQuery({
        queryKey: ['allDoctors'],
        queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/allDoctors')
            .then(res => res.json())

    })

    //get doctors Specialty from the AppointmentOptions collection from database server side
    const { data: AppointmentOptions = [] } = useQuery({
        queryKey: ['AppointmentOptions'],
        queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/AppointmentOptions')
            .then(res => res.json())

    })


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState('');


    const handleAddReview = (data) => {
        console.log(data);
        setAddReview(true)
        const userReview = {
            name: data.name,
            email: data.email,
            doctorName: data.doctorsName,
            specialty: data.specialty,
            review: data.review
        }
        //console.log("User Review: ", userReview)

        //post the reviews to database
        fetch('https://doctors-portal-server-taupe.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(reviewData => {
                if (reviewData.acknowledged) {
                    toast.success('Review Added Successfully')
                    //navigate('/dashboard/manageDoctors')
                    reset();
                    setAddReview(false)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${reviewData.message}`,
                        text: 'Please Try Again'
                    })
                    setAddReview(false)
                    //setLoading(false);
                }
            })
    }


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }





    return (
        <div>
            <h1 className='text-3xl text-center mt-2'>Add Your Review</h1>
            <div className='mt-8 flex justify-center items-center'>
                <div className='w-[600px] p-6 border-2 rounded-xl dark:bg-gray-900'>

                    <form onSubmit={handleSubmit(handleAddReview)}>

                        <div className='flex justify-between gap-3'>
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text dark:text-white">Your Name</span>
                                </label>

                                <input type="text" {...register("name", { required: "Name is Required" })}
                                    placeholder="Enter Your Name" className="input input-bordered border-black w-full dark:text-black" />

                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                            </div>


                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text dark:text-white">Your Email</span>
                                </label>

                                <input type="email" {...register("email", { required: "Email is Required" })}
                                    placeholder="Enter Your Email" className="input input-bordered border-black w-full dark:text-black" />

                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                            </div>
                        </div>


                        <div className='flex justify-between gap-3'>
                            <div className="form-control w-full mb-3">
                                <label className="label">
                                    <span className="label-text dark:text-white">Doctor's Name</span>
                                </label>

                                <select
                                    type="text"
                                    {...register("doctorsName", { required: "Doctors Name is Required" })}

                                    name='doctorsName' className="select select-bordered border-black w-full dark:text-black">

                                    {
                                        allDoctors.map(doctor => <option key={doctor._id} value={doctor.name}>{doctor.name}</option>)
                                    }


                                </select>

                                {errors.doctorsName && <p className='text-red-600'>{errors.doctorsName?.message}</p>}

                            </div>

                            <div className="form-control w-full mb-3">
                                <label className="label">
                                    <span className="label-text dark:text-white">Specialty</span>
                                </label>

                                <select
                                    type="text"
                                    {...register("specialty", { required: "Doctors Specialty is Required" })}

                                    name='specialty' className="select select-bordered border-black w-full dark:text-black">

                                    {
                                        AppointmentOptions.map(appointment => <option key={appointment._id} value={appointment.name}>{appointment.name}</option>)
                                    }


                                </select>

                                {errors.specialty && <p className='text-red-600'>{errors.specialty?.message}</p>}

                            </div>
                        </div>

                        <div>
                            <textarea  {...register("review", { required: "Review is Required" })} className="textarea textarea-bordered border-black w-full h-28 mb-4 mt-4 text-black" placeholder="Add Your Review"></textarea>
                        </div>


                        {
                            error && <p className='text-red-600'>{error}</p>
                        }

                        {/* <input type="submit"
                            value='Add Review'
                            className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600' /> */}

                        <button type='submit' className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600'>

                            {addReview ? <SmallSpinner> </SmallSpinner> : 'Add Review'}

                        </button>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default Review;

