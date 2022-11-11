import React from 'react';
import chair from '../../../assets/images/chair.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import './banner.css'

const Banner = () => {
    
    return (
        <div className='banner'>
            <div className="hero mt-5 py-6">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="w-full lg:w-1/2 rounded-lg shadow-2xl" alt='banner' />
                    <div className='sm:mt-10'>
                        <h1 className="text-5xl font-bold">Your New Smile Starts Here!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;