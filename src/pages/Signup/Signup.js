import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../Contexts/AuthProvider';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';

const Signup = () => {


    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

    const [error, setError] = useState('')

    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     defaultValues: {
    //         name: 'Fahim Faysal',
    //         email: 'fahim@gmail.com',
    //         password: 'A1@fahim'
    //     },
    // });

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignup = (data) => {
        console.log(data);
        setError('');

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("User from Sign Up Page", user);
                Swal.fire(
                    'Nice',
                    'User Created and Updated Name Successfully',
                    'success'
                )


                //updating the user name
                const userInfo = {
                    displayName : data.name
                }

                updateUser(userInfo)
                .then(() => {})
                .catch(error => {
                    console.error(error);
                    setError(error.message)
                })

                navigate('/login')
                
            })
            .catch(error => setError(error.message))
    }


    const handleSignInByGoogle = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log("User Sign in By Google", user);
            Swal.fire(
                'Nice',
                'User Created Successfully By Google',
                'success'
            )
            navigate('/')

        })
        .catch(error => {
            toast.error("Google Sign In Failed")
            setError(error.message)
        })
    }




    return (
        <div className='mt-8 flex justify-center items-center'>
            <div className='w-96 p-6 border-2 rounded-xl'>
                <h2 className='text-2xl text-center mb-4 font-bold uppercase'>Sign up</h2>

                <form onSubmit={handleSubmit(handleSignup)}>

                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>

                        <input type="text" {...register("name", { required: "Name is Required" })}
                            placeholder="Enter Name" className="input input-bordered w-full" />

                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                    </div>


                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input type="email" {...register("email", { required: "Email is Required" })}
                            placeholder="Enter Email" className="input input-bordered w-full" />

                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                    </div>


                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input type="password" {...register("password", {
                            required: "Password is Required",
                            minLength: { value: 8, message: 'Password must be 8 characters or longer' },
                            // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password Should Contain at least 1 A-Z, 0-9 and [!@#$&*] character " }
                        })} placeholder="Enter Password" className="input input-bordered w-full" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                    </div>

                    {
                        error && <p className='text-red-600'>{error}</p>
                    }

                    <input type="submit"
                        value='Sign up'
                        className='btn btn-accent w-full text-white uppercase py-3 rounded-md' />
                </form>

                <div className='mt-3'>
                    <p className='text-sm text-center font-semibold'>Already Have An Account ? <Link to='/login' className='text-secondary font-semibold'>Please Login</Link></p>
                </div>

                <div className="divider">OR</div>

                <div>
                    <button onClick={handleSignInByGoogle} className='btn btn-outline btn-accent uppercase w-full'> <FcGoogle className='text-2xl mr-2'></FcGoogle> Continue with google</button>
                </div>

            </div>
        </div>
    );
};

export default Signup;