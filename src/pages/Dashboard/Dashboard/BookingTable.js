import React from 'react';

const BookingTable = ({ appointment }) => {

    const { appointmentDate, email, patient, slot, treatment, phone } = appointment;
    return (

        <tr>
            <th>{treatment}</th>
            <td>{patient}</td>
            <td>{appointmentDate}</td>
            <td>{slot}</td>
        </tr>
    );
};

export default BookingTable;