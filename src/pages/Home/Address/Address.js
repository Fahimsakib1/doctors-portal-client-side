import React from 'react';
import { FiClock, } from 'react-icons/fi';
import { ImLocation } from 'react-icons/im';
import { BsTelephone } from 'react-icons/bs';

import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import clock from '../../../assets/icons/clock.svg';



const Address = () => {
    return (
        <div className=' mt-8 '>
            <div className=''>

                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-x-14 gap-y-4  w-full sm:w-3/4 lg:w-full md:w-full lg:mx-0 md:mx-auto sm:mx-auto mx-auto'>

                    <div className='flex justify-center align-center bg-gradient-to-r from-primary to-secondary rounded-xl py-10 px-2 lg:my-0 sm:my-2 md:my-2 my-0'>
                        <div className='px-6 my-auto'>
                            {/* <FiClock className='text-white text-6xl '></FiClock> */}
                            <figure>
                                <img className='' src={clock} alt="Movie" />
                            </figure>
                        </div>
                        <div className='text-white'>
                            <h3 className='text-xl'>Opening Hours</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                        </div>
                    </div>


                    <div className='flex justify-center bg-accent px-2 lg:my-0 sm:my-2 md:my-2 my-0 py-10 rounded-xl '>
                        <div className='px-6 my-auto'>
                            {/* <ImLocation className='text-white text-6xl'></ImLocation> */}
                            <figure>
                                <img className='' src={marker} alt="Movie" />
                            </figure>
                        </div>
                        <div className='text-white'>
                            <h3 className='text-xl'>Visit Our Location</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                        </div>
                    </div>

                    <div className='flex justify-center bg-gradient-to-r from-primary to-secondary  py-10 rounded-xl px-2 lg:my-0 sm:my-2 md:my-2 my-0'>
                        <div className='px-6 my-auto'>
                            {/* <BsTelephone className='text-white text-6xl'></BsTelephone> */}
                            <figure className=''>
                                <img className='' src={phone} alt="Movie" />
                            </figure>
                        </div>
                        <div className='text-white my-auto'>
                            <h3 className='text-xl'>Contact Us</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Address;