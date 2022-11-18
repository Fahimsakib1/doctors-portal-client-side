import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Spinner from '../../Shared/Loading/Spinner';
import Swal from 'sweetalert2';



const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const closeModal = () => {
        setDeletingDoctor(null)
    }


    //headers er moddhe authorization token dicchi karon server side theke verifyAdmin ei function use korbo and check korbo j login kora user ta admin ki na.
    // jodi login kora user ta admin na hoy tahole se doctors er kono data get/post/delete kicchy korte parbe na
    const { data: doctors = [], refetch, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
                    }
                });
                const data = await res.json()
                return data;
            }
            catch (error) {
                console.log(error)
            }
        }
    })


    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-black mx-auto mt-64"></div>
    }


    const handleDeleteDoctor = (id, name) => {
        
        //alert(`Deleting ${name} with ID: ${id}`)
        fetch(`http://localhost:5000/doctors/${id}`, {
            method: 'DELETE',
            headers: {
                  //headers er moddhe authorization token dicchi karon server side theke verifyAdmin ei function use korbo and check korbo j login kora user ta admin ki na.
                // jodi login kora user ta admin na hoy tahole se doctors er kono data get/post/delete kicchy korte parbe na
                authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                //const remainingDoctors = doctors.filter (doctor => doctor._id !== id);
                refetch();
                Swal.fire(
                    'Done!',
                    `Doctor ${name} Deleted Successfully`,
                    'success'
                )
            }

            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Can not Delete Doctor'
                })
            }
        })
    }





    return (
        <div>

            <h1 className='text-3xl text-center font-bold mt-3 mb-6 text-blue-600'> Manage Doctors {doctors?.length}</h1>

            <div className="overflow-x-auto">
                <table className="table w-full mb-12 dark:w-3/4 dark:mx-auto ">

                    <thead className=''>
                        <tr className='text-center'>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600'>No</th>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600 '>Avatar</th>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600'>Name</th>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600'>Email</th>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600'>Specialty</th>
                            <th className=' dark:bg-slate-900 border-2 dark:border-green-600 dark:text-blue-600'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors?.map((doctor, index) =>
                                <tr key={doctor._id} className='text-center '>

                                    <td className='font-bold dark:bg-gray-800 dark:border-green-600'>
                                        {index + 1}
                                    </td>

                                    <td className='dark:bg-gray-800 dark:border-green-600'>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar mx-auto">
                                                <div className="w-12 rounded-full">
                                                    <img className='text-center' src={doctor.image} alt="DoctorImage" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='font-bold dark:bg-gray-800 dark:border-green-600'>
                                        {doctor.name}
                                    </td>

                                    <td className='dark:bg-gray-800 dark:border-green-600'>{doctor.email}</td>

                                    <td className='dark:bg-gray-800 dark:border-green-600'>
                                        {doctor.specialty}
                                    </td>


                                    <td className='dark:bg-gray-800 text-center dark:border-green-600'>
                                        <label 
                                        onClick={() => setDeletingDoctor(doctor)}
                                        htmlFor="confirmation-modal" 
                                        className="btn dark:bg-gray-900 hover:bg-white bg-white border-0 ">
                                            <FaTrashAlt className=' text-2xl text-red-600  hover:text-red-700'></FaTrashAlt>
                                        </label>

                                    </td>
                                </tr>)

                        }


                    </tbody>

                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal deletingDoctor = {deletingDoctor} 
                closeModal = {closeModal}
                handleDeleteDoctor = {handleDeleteDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;