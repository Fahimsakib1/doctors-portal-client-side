import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {FaUserCircle} from 'react-icons/fa';

const ShowReviews = () => {
    
    // const [reviews, setReview] = useState([])
    // useEffect( () => {

    // }, [])

    //get the reviews data from server and databse
    const {data: reviews = [], isLoading} = useQuery({
        queryKey: ['reviews'],
        queryFn: () => fetch('https://doctors-portal-server-taupe.vercel.app/reviews')
        .then(res => res.json())
    })


    return (
        <div>
            <h1 className='text-5xl text-center font-thin text-blue-600 mt-16 mb-8'>User's Review : {reviews?.length}</h1>
            <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews &&
                    reviews?.map(review => 
                    
                    <div key={review._id} className=" flex flex-col max-w-sm mx-4 my-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:rounded-xl rounded-xl">
                        <div className="px-4 py-10 rounded-t-lg sm:px-8 md:px-12 bg-gray-900">
                            <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>
                                <span>{review.review}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-blue-400 text-gray-900">
                            {/* <img src={fahim} alt="fahim" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full  bg-gray-700" /> */}
                            <FaUserCircle className='w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full  bg-gray-100'></FaUserCircle>
                            <p className="text-xl font-bold leading-tight">{review.name}</p>
                            <p className="text-sm font-semibold ">{review.email}</p>
                        </div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default ShowReviews;