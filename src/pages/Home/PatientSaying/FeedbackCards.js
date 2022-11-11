import React from 'react';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import FeedbackCard from './FeedbackCard';
import quote from '../../../assets/icons/quote.svg';


const FeedbackCards = () => {

    const feedbacks = [
        {
            id: 1,
            name: 'Winson Herry',
            address: 'California',
            img: people1,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
        },

        {
            id: 2,
            name: 'Kim Kardashian',
            address: 'California',
            img: people2,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
        },

        {
            id: 3,
            name: 'Dilraba Dilmurat',
            address: 'California',
            img: people3,
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
        },


    ]

    return (
        <div className=' mb-24'>
            <div className='flex justify-between'>
                <div className='mt-24'>
                    <p className='text-2xl text-primary mb-2'>Testimonials</p>
                    <h1 className='text-5xl'>What Our Patients Says</h1>
                </div>

                <div className='mt-24'>
                    <figure>
                        <img className='w-24 lg:w-40' src={quote} alt="" />
                    </figure>
                </div>
            </div>

            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-6'>
                {
                    feedbacks.map(feedback => <FeedbackCard key={feedback.id} feedback={feedback}></FeedbackCard>)
                }
            </div>
        </div>
    );
};

export default FeedbackCards;