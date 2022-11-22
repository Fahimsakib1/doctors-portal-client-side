import React from 'react';

const DoctorInfoModal = ({ doctorInfo }) => {

    const { _id, name, email, specialty, image } = doctorInfo;

    return (
        <div>
            <input type="checkbox" id="doctorInfo-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative mx-auto text-center dark:text-black">
                    <label htmlFor="doctorInfo-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="avatar">
                        <div className="w-64 rounded-lg">
                            <img src={image} alt=''/>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold">Name: {name}</h3>
                    <h3 className="text-lg font-bold">Specialty: {specialty}</h3>
                    <h3 className="text-lg font-bold">Email: {email}</h3>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfoModal;