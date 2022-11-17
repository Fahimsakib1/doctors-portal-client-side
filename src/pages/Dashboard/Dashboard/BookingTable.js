import React from 'react';

const BookingTable = ({ appointment }) => {

    const { appointmentDate, email, patient, slot, treatment, phone } = appointment;
    return (

        <tr className='dark:text-white'>
            <th className='dark:bg-gray-700'>{treatment}</th>
            <td className='dark:bg-gray-700'>{patient}</td>
            <td className='dark:bg-gray-700'>{appointmentDate}</td>
            <td className='dark:bg-gray-700'>{slot}</td>
        </tr>
    );
};

export default BookingTable;