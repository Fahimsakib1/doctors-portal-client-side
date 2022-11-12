import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedDate);

    return (
        <div>
            <AppointmentBanner selectedDate = {selectedDate} setSelectedDate = {setSelectedDate}></AppointmentBanner>

            <AvailableAppointments 
            selectedDate = {selectedDate} 
            setSelectedDate = {setSelectedDate}></AvailableAppointments>
        </div>
    );
};

export default Appointment;