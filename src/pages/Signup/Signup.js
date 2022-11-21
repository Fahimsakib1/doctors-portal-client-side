import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../Contexts/AuthProvider';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import useToken from '../../Hooks/useToken';
import SmallSpinner from '../../components/SmallSpinner/SmallSpinner';



const Signup = () => {


    const { createUser, updateUser, googleSignIn, loading, setLoading } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [error, setError] = useState('');


    //setting the token to local storage from client side and checking the user email for token
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    if (token) {
        navigate('/')
    }






    //we can use default input field values to react hook form
    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     defaultValues: {
    //         name: 'Fahim Faysal',
    //         email: 'fahim@gmail.com',
    //         password: 'A1@fahim'
    //     },
    // });





    const { register, handleSubmit, reset, formState: { errors } } = useForm();



    const handleSignup = (data) => {
        console.log(data);
        setError('');

        createUser(data.email, data.password)
            .then(result => {
                // const user = result.user;
                // console.log("User from Sign Up Page", user);
                // Swal.fire(
                //     'Nice',
                //     'User Created and Updated Users Name Successfully',
                //     'success'
                // )


                //updating the user name
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {

                        saveUserToDataBase(data.name, data.email);
                        Swal.fire(
                            'Nice',
                            'User Created and Updated Users Name Successfully',
                            'success'
                        )

                        const user = result.user;
                        console.log("User from Sign Up Page After Update Name", user);
                        setLoading(false);
                        reset();
                    })

                    .catch(error => {
                        console.error(error);
                        setError(error.message)
                        toast.error("User name Update Failed")
                    })

                //navigate('/login')

            })
            .catch(error => {
                toast.error(error.message)
                setError(error.message)
                setLoading(false);
            })
    }



    //save user info to database
    const saveUserToDataBase = (name, email) => {
        const user = { name, email };
        fetch('https://doctors-portal-server-taupe.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    console.log('Save user Info to database from Signup Page', data);

                    toast.success('User Added to Database')

                    //set the token to the local Storage
                    setCreatedUserEmail(email)
                }
                else {

                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: 'Please Sign Up with a new Email'
                    })

                }

            })
    }


    //user token from client side. Ei Function tai useToken.js er moddhe likha hoicehe
    // const getUserToken = (email) => {
    //     fetch(`https://doctors-portal-server-taupe.vercel.app/jwt?email=${email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.accessToken){
    //             localStorage.setItem('doctorsPortalToken', data.accessToken)
    //             navigate('/');
    //         }
    //         else{
    //             toast.error('Token Not Issued')
    //         }
    //     })
    // }




    const handleSignInByGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log("User Sign in By Google", user);
                
                saveUserToDataBase('User Signed In By Google', user?.email)
                tokenForGoogleSignIn(user?.email)
                //navigate('/')

            })
            .catch(error => {
                toast.error("Google Sign In Failed")
                setError(error.message)
            })
    }



    const tokenForGoogleSignIn = (email) => {

        //get jwt token in client side
        fetch('https://doctors-portal-server-taupe.vercel.app/jwt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(email)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('doctorsPortalToken', data.token);
                navigate(from, { replace: true });
            })
    }




    return (
        <div className='mt-8 flex justify-center items-center'>
            <div className='w-96 p-6 border-2 rounded-xl dark:bg-gray-900'>
                <h2 className='text-2xl text-center mb-4 font-bold uppercase'>Sign up</h2>

                <form onSubmit={handleSubmit(handleSignup)}>

                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text dark:text-white">Name</span>
                        </label>

                        <input type="text" {...register("name", { required: "Name is Required" })}
                            placeholder="Enter Name" className="input input-bordered w-full dark:text-black" />

                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                    </div>


                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text dark:text-white">Email</span>
                        </label>

                        <input type="email" {...register("email", { required: "Email is Required" })}
                            placeholder="Enter Email" className="input input-bordered w-full dark:text-black" />

                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                    </div>


                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text dark:text-white">Password</span>
                        </label>

                        <input type="password" {...register("password", {
                            required: "Password is Required",
                            minLength: { value: 8, message: 'Password must be 8 characters or longer' },
                            // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password Should Contain at least 1 A-Z, 0-9 and [!@#$&*] character " }
                        })} placeholder="Enter Password" className="input input-bordered w-full dark:text-black" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                    </div>

                    {
                        error && <p className='text-red-600'>{error}</p>
                    }

                    {/* <input type="submit"
                        value='Sign up'
                        className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600' /> */}

                    <button type='submit' className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600'>
                        
                        {loading ? <SmallSpinner></SmallSpinner> : 'Sign up'}
                    
                    </button>
                </form>

                <div className='mt-3'>
                    <p className='text-sm text-center font-semibold'>Already Have An Account ? <Link to='/login' className='text-secondary font-semibold'>Please Login</Link></p>
                </div>

                <div className="divider">OR</div>

                <div>
                    <button onClick={handleSignInByGoogle} className='btn btn-outline btn-accent uppercase w-full dark:bg-black dark:text-white'> <FcGoogle className='text-2xl mr-2'></FcGoogle> Continue with google</button>
                </div>

            </div>
        </div>
    );
};

export default Signup;
