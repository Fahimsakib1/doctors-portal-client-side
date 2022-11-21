import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Spinner from '../../Shared/Loading/Spinner';
import Swal from 'sweetalert2'
import SmallSpinner from '../../../components/SmallSpinner/SmallSpinner';





const AddDoctor = () => {


    //API key from image bb
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    //console.log("Image BB Key", imageHostKey);

    const { createUser, updateUser, googleSignIn, loading, setLoading } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');


    //fetching the data from appointCollections database and named as appointmentSpecialty to get the only the treatment name on the form
    const { data: appointmentSpecialty = [], isLoading } = useQuery({
        queryKey: ['appointmentSpecialty'],
        queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/appointmentSpecialty')
            .then(res => res.json())
    })


    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const handleAddDoctor = (data) => {
        console.log(data)
        //console.log(data.photo[0]);
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                //console.log(imageData)
                if (imageData.success) {
                    console.log(imageData.data.url)

                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imageData.data.url
                    }

                    //adding doctor's info to database
                    //headers er moddhe authorization token dicchi karon server side theke verifyAdmin ei function use korbo and check korbo j login kora user ta admin ki na.
                    // jodi login kora user ta admin na hoy tahole se doctors er kono data get/post/delete kicchy korte parbe na
                    fetch('https://doctors-portal-server-taupe.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                Swal.fire(
                                    'Good',
                                    `Doctor ${data.name} is added with specialty of ${data.specialty}`,
                                    'success'
                                )
                                navigate('/dashboard/manageDoctors')
                                reset();
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `${result.message}`,
                                    text: 'Add a New Doctor'
                                })
                                //setLoading(false);
                            }

                        })

                }

            })

    }




    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            <h1 className='text-3xl text-center mt-3 mb-4'>Add A Doctor</h1>

            <div className='mt-8 flex justify-center items-center'>
                <div className='w-96 p-6 border-2 rounded-xl dark:bg-gray-900'>
                    {/* <h2 className='text-2xl text-center mb-4 font-bold uppercase'>Add Doctor</h2> */}

                    <form onSubmit={handleSubmit(handleAddDoctor)}>

                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text dark:text-white">Name</span>
                            </label>

                            <input type="text" {...register("name", { required: "Name is Required" })}
                                placeholder="Enter Your Name" className="input input-bordered w-full dark:text-black" />

                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                        </div>


                        <div className="form-control w-full mb-2">
                            <label className="label">
                                <span className="label-text dark:text-white">Email</span>
                            </label>

                            <input type="email" {...register("email", { required: "Email is Required" })}
                                placeholder="Enter Your Email" className="input input-bordered w-full dark:text-black" />

                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                        </div>


                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text dark:text-white">Specialty</span>
                            </label>

                            <select
                                type="text"
                                {...register("specialty", { required: "Specialty is Required" })}

                                name='specialty' className="select select-bordered w-full mt-3 dark:text-black">

                                {
                                    appointmentSpecialty.map(specialty => <option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
                                }


                            </select>

                            {errors.specialty && <p className='text-red-600'>{errors.specialty?.message}</p>}

                        </div>


                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text dark:text-white">Upload Photo</span>
                            </label>

                            <input type="file" {...register("photo", { required: "Photo is Required" })}
                                placeholder="Upload Your Photo" className="input  w-full dark:text-black pt-2" />

                            {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}

                        </div>


                        {/* <div>

                            <div className="flex items-center justify-center w-full mb-8">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-8  mt-2  text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="input" {...register("photo", { required: "Photo is Required" })} />
                                </label>
                            </div>
                            {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}

                        </div> */}



                        {
                            error && <p className='text-red-600'>{error}</p>
                        }

                        <input type="submit"
                            value='Add'
                            className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600' />

                    </form>


                </div>
            </div>
        </div>
    );
};

export default AddDoctor;