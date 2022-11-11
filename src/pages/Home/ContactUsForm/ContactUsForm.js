import React from 'react';
import pic from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ContactUsForm = () => {
    return (
        <div style={{
            background: `url(${pic})`,
            backgroundPosition: "center"
        }} 
        className="rounded-lg pt-8">

            <div className='text-center'>
                <div className=''>
                    <p className='text-2xl text-primary mb-4'>Contact Us</p>
                    <h1 className='text-3xl text-white'>Stay Connected With Us</h1>
                </div>
            </div>


            <div className="hero">
                <div className="hero-content w-full">
                    <div className="card flex-shrink-0 w-full max-w-sm">
                        <div className="card-body">
                            <div className="form-control mb-3">
                                <input type="text" placeholder="Email Address" className="input input-bordered" />
                            </div>
                            <div className="form-control  mb-3">
                                <input type="text" placeholder="Subject" className="input input-bordered" />
                            </div>
                            <div className=' mb-3'>
                                <textarea className="textarea textarea-bordered w-full h-28" placeholder="Your Message"></textarea>
                            </div>
                            <div className='w-1/2 mx-auto px-8 form-control'>
                                <PrimaryButton>Submit</PrimaryButton>
                            </div>
                            {/* <div className="form-control">
                                <button className="btn btn-primary">Login</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsForm;