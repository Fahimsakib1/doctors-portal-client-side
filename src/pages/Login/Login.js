import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../Contexts/AuthProvider';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';



const Login = () => {

    const [loginError, setLoginError] = useState('')
    const { userLogin, googleSignIn } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("Uer From Login Page", user);
                // Swal.fire(
                //     'Nice',
                //     'Login Successful',
                //     'success'
                // )
                toast.success('Login Successful');
                navigate(from, {replace: true});
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed',
                })

                setLoginError(error.message)
            })
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
            navigate(from, {replace: true});

        })
        .catch(error => {
            toast.error("Google Sign In Failed")
            setLoginError(error.message)
        })
    }



    return (
        <div className='mt-12 flex justify-center items-center'>
            <div className='w-96 p-6 border-2 rounded-xl'>
                <h2 className='text-2xl text-center mb-4 font-bold uppercase'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input type="email" {...register("email", { required: "Email is Required" })}
                            placeholder="Enter Email" className="input input-bordered w-full" />

                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input type="password" {...register("password", { required: "Password is Required", minLength: { value: 8, message: 'Password must be 8 characters or longer' } })} placeholder="Enter Password" className="input input-bordered w-full" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label mb-6">
                            <span className="label-text">Forget Password?</span>
                        </label>

                    </div>

                    <input type="submit"
                    value='Login'
                    className='btn btn-accent w-full text-white uppercase py-3 rounded-md' />

                    {
                        loginError && <p className='text-red-600'>{loginError}</p>
                    }
                </form>

                <div className='mt-3'>
                    <p className='text-sm text-center font-semibold'>New to Doctors Portal ? <Link to='/signup' className='text-secondary font-semibold'>Create New Account</Link></p>
                </div>

                <div className="divider">OR</div>

                <div>
                    <button onClick={handleSignInByGoogle} className='btn btn-outline btn-accent uppercase w-full'> <FcGoogle className='text-2xl mr-2'></FcGoogle> Continue with google</button>
                </div>

            </div>
        </div>
    );
};

export default Login;