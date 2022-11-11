import React from 'react';
import treatment from '../../../assets/images/treatment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const DentalCare = () => {
    return (
        <div>
            <div className="hero mt-24 py-6 mb-28">
                <div className="hero-content flex-col lg:flex-row  gap-x-24 lg:w-3/4 w-full">
                    <img src={treatment} className="w-full md:w-[458px] rounded-lg shadow-2xl" alt='treatment' />
                    <div className='sm:mt-10 md:mx-auto mx-0 w-full md:w-3/4'>
                        <h1 className="text-5xl font-bold">Exceptional Dental <br></br> Care,  on Your Terms</h1>
                        <div className=''>
                            <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        </div>
                        <PrimaryButton>Getting Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DentalCare;