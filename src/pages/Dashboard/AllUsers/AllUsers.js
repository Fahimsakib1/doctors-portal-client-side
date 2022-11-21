import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {

    // used react query to load the registered users
    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/users')
    //         .then(res => res.json())
    // })

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/users', {
            headers: {
                authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
            }
        })
            .then(res => res.json())
    })

    

    const handleMakeAdmin = (id) => {
        fetch(`https://doctors-portal-server-taupe.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('doctorsPortalToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Admin Permission Granted');
                    console.log(data);
                    refetch()
                }
            })
    }




    return (

        <div>
            <h2 className='text-2xl text-center text-blue-600 my-6'> Total Registered Users {users?.length}</h2>

            <div className="overflow-x-auto mb-24 mx-24">
                <table className="table w-full">

                    <thead className=''>
                        <tr className='dark:text-white text-center border-2'>
                            <th className='dark:bg-slate-900 border-2 dark:border-green-600'>No</th>
                            <th className='dark:bg-slate-900 border-2 dark:border-green-600'>User Name</th>
                            <th className='dark:bg-slate-900 border-2 dark:border-green-600'>Email</th>
                            <th className='dark:bg-slate-900 border-2 dark:border-green-600'>Admin</th>
                            <th className='dark:bg-slate-900 border-2 dark:border-green-600'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='dark:text-black'>
                        {
                            users.map((user, index) => <tr key={index} className='dark:text-white'>
                                <th className='dark:bg-gray-800 border-1 border-black text-center'>{index + 1}</th>
                                <th className='dark:bg-gray-800 border-1 border-black text-center'>{user.name}</th>
                                <td className='dark:bg-gray-800 border-1 border-black text-center'>{user.email}</td>
                                <td className='dark:bg-gray-800 border-1 border-black text-center'>
                                    {
                                        user?.role !== 'Admin' ?
                                        <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs bg-violet-700 hover:bg-blue-700'>Make Admin</button>
                                        :
                                        <button className='btn btn-xs bg-green-600'>Admin</button>
                                    }
                                </td>
                                <td className='dark:bg-gray-800 border-1 border-black text-center'><button><FaTrashAlt className=' text-2xl text-red-600  hover:text-red-700'></FaTrashAlt></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;