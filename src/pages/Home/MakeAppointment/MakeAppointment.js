import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-32 rounded-xl py-10 px-4'
        style={{
            background: `url(${appointment})`
        }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="lg:w-1/2 rounded-lg shadow-2xl -mt-40 hidden md:block" alt='' />
                    <div>
                        <h4 className='text-primary text-xl font-bold mb-4'>Appointment</h4>
                        <h1 className="text-4xl font-bold text-white">Make an Appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Make Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;