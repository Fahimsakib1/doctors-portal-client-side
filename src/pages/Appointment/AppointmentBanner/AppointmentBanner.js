import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import './AppointmentBanner.css';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {


    return (
        <div>
            <header className='appointment-banner py-12'>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-x-24">
                        <img src={chair}
                            className="w-full lg:w-1/2 rounded-lg shadow-2xl" alt='dentist chair' />

                        <div>
                            <DayPicker
                                mode='single'
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                            ></DayPicker>

                            {/* {
                                selectedDate &&
                                <p className='text-lg text-primary text-center'>You Have Picked Date: {format(selectedDate, 'PP')}.</p>
                            } */}

                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AppointmentBanner;