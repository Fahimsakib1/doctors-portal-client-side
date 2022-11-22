import React, { useState } from 'react';
import DoctorInfoModal from '../DoctorInfoModal/DoctorInfoModal';

const ConfirmationModal = ({ deletingDoctor, closeModal, handleDeleteDoctor }) => {

    const { _id, name, email, specialty } = deletingDoctor;

    const [doctorInfo, setDoctorInfo] = useState(null);


    const handleDoctorInfo = () => {
        console.log("Doctors Info:", deletingDoctor);
        //alert(`Doctor's Name: ${name}.. Specialty : ${specialty}.. Email : ${email}.. ID : ${_id}`)
    }

    return (
        <div>

            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-black">Are you sure you want to delete Doctor <span className='text-xl text-red-600'> {name}?</span></h3>
                    <p className='text-md text-red-600'>If you delete, Doctor {name}'s data can not be retrieved</p>

                    <div className="modal-action">

                        <label onClick={() => setDoctorInfo(deletingDoctor)} htmlFor="doctorInfo-modal" className="btn btn-md bg-blue-800 border-0 text-white">Doctor's Info</label>

                        {/* <label htmlFor="doctorInfo-modal" className="btn">open modal</label> */}

                        <button onClick={closeModal} className='btn  bg-green-700 text-white btn-md border-0'> Close</button>

                        <label
                            onClick={() => handleDeleteDoctor(_id, name)}
                            htmlFor="confirmation-modal" className="btn btn-md bg-red-600  border-0 text-white">Delete
                        </label>
                        
                    </div>
                </div>
            </div>
            {
                doctorInfo && <DoctorInfoModal doctorInfo = {doctorInfo}></DoctorInfoModal>
            }
        </div> 
    );
};

export default ConfirmationModal;