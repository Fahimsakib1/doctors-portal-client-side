import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const ErrorPage = () => {
    
    const error = useRouteError();

    const { user, signOutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login')
            })
            .catch(error => console.error(error.message))

    }
    
    
    return (
        <div>
            <section className="flex items-center h-full p-16 bg-gray-100 text-black">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 mb-56">
                    <div className="max-w-md text-center">
                        {/* <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
                            <span className="sr-only">Error</span>404
                        </h2> */}
                        <div className='flex justify-center'>
                            <p className='mb-8 font-extrabold text-9xl text-red-600'>4</p>
                            <div className="h-20 w-20 border-8 border-dashed rounded-full animate-spin border-red-600 my-auto mx-2"></div>
                            <p className='mb-8 font-extrabold text-9xl text-red-600'>4</p>
                        </div>
                        <p className="text-2xl font-semibold md:text-3xl text-red-600">Oops... Page {error.statusText || error.message}</p>
                        <p className="mt-4 mb-8 text-black text-semibold text-lg">It seems that you are visiting a route which is not available in this website. Try to visit the correct routes</p>
                        
                        
                        <div>
                        <h2 className='font-semibold text-2xl'>Please <button onClick={handleLogOut} className='bg-red-600 text-white rounded-lg px-6  btn border-0 my-4 hover:bg-red-600'>Sign Out</button> And Log Back in</h2>
                        </div>

                        <div>
                            <Link to='/'><button className='btn btn-primary'>Back to Homepage</button></Link>
                        </div>

                    </div>
                </div>
            </section> 
        </div>
    );
};

export default ErrorPage;