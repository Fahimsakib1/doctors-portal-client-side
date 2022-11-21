import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../Contexts/AuthProvider';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import useToken from '../../Hooks/useToken';
import SmallSpinner from '../../components/SmallSpinner/SmallSpinner';



const Login = () => {

    const [loginError, setLoginError] = useState('')

    const { userLogin, googleSignIn, resetPassword, user, loading, setLoading } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [userEmail, setUserEmail] = useState('');


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';



    //setting the token to local storage from client side and checking the user email for token
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    if (token) {

        Swal.fire(
            'Nice',
            'User Logged In by verifying the token',
            'success'
        )
        toast.success('User Login Successful By Verifying Token');
        navigate(from, { replace: true });
    }



    const handleLogin = (data) => {
        
        console.log(data);
        setLoginError('');
        setUserEmail(data.email)
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("Uer From Login Page", user);
                setLoginUserEmail(data.email)
                //toast.success('Login Successful');
                //navigate(from, { replace: true });

                
                // const currentUser = {
                //     email: user?.email
                // }
                // //get jwt token in client side
                // fetch('https://doctors-portal-server-taupe.vercel.app/jwt', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(currentUser)
                // })

                // .then(res => res.json())
                // .then(data => {
                //     console.log("Token received from server side", data.token)
                //     //set the JWT token in local storage
                //     localStorage.setItem('doctorsPortalToken', data.token);
                //     navigate(from, { replace: true });

                //     })
                
                reset();
            })


            .catch(error => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Login Failed',
                // })
                toast.error(error.message);
                setLoading(false)
                setLoginError(error.message)
            })
    }



    const handleSignInByGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log("User Sign in By Google", user);

                const currentUser = {
                    email: user?.email
                }
                //get jwt token in client side
                fetch('https://doctors-portal-server-taupe.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })

                .then(res => res.json())
                .then(data => {
                    console.log("Token received from server side", data.token)
                    //set the JWT token in local storage
                    localStorage.setItem('doctorsPortalToken', data.token);
                    navigate(from, { replace: true });

                    })

            })
            .catch(error => {
                toast.error("Google Sign In Failed")
                setLoginError(error.message)
            })
    }




    const handleForgotPassword = () => {

        if (!userEmail) {
            Swal.fire({
                icon: 'error',
                title: 'To Reset Password',
                text: 'You must provide your email',
            })
            return;
        }
        setLoginError('');

        resetPassword(userEmail)
            .then(() => {
                Swal.fire(
                    'Hello!',
                    `Password reset link has been sent to your email ${userEmail}. Please check your email`,
                    'success'
                )
                setLoading(false)
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
                //setLoading(false)
            })

    }


    
    // const tokenForGoogleSignIn = (email) => {
        
    //     fetch('https://doctors-portal-server-taupe.vercel.app/jwt', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(email)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem('doctorsPortalToken', data.token);
    //         navigate(from, { replace: true });

    //     })
    // }




    return (
        <div className='mt-12 flex justify-center items-center'>
            <div className='w-96 p-6 border-2 rounded-xl dark:bg-gray-900 '>
                <h2 className='text-2xl text-center mb-4 font-bold uppercase'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text dark:text-white">Email</span>
                        </label>

                        <input name="email" type="email" {...register("email", { required: "Email is Required" })}
                            placeholder="Enter Email" className="input input-bordered w-full dark:text-black" />

                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text dark:text-white">Password</span>
                        </label>

                        <input type="password" {...register("password", { required: "Password is Required", minLength: { value: 8, message: 'Password must be 8 characters or longer' } })} placeholder="Enter Password" className="input input-bordered w-full dark:text-black" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label mb-6">
                            <span onClick={handleForgotPassword} className="label-text hover:text-blue-600 font-semibold dark:text-blue-600">Forget Password?</span>
                        </label>

                    </div>

                    {/* <input type="submit"
                        value={loading ? <SmallSpinner> </SmallSpinner> : 'Login'}
                        className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600' /> */}
                    <button type='submit' className='btn btn-accent w-full text-white uppercase py-3 rounded-md dark:bg-black dark:border-2 dark:border-green-600'>
                        
                        {loading ? <SmallSpinner> </SmallSpinner> : 'Login'}
                    
                    </button>

                    {
                        loginError && <p className='text-red-600'>{loginError}</p>
                    }
                </form>

                <div className='mt-3'>
                    <p className='text-sm text-center font-semibold'>New to Doctors Portal ? <Link to='/signup' className='text-secondary font-semibold'>Create New Account</Link></p>
                </div>

                <div className="divider">OR</div>

                <div>
                    <button onClick={handleSignInByGoogle} className='btn btn-outline btn-accent uppercase w-full dark:bg-black dark:text-white '> <FcGoogle className='text-2xl mr-2'></FcGoogle> Continue with google</button>
                </div>

            </div>

        </div>
    );
};

export default Login;