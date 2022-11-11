import React from 'react';

const FeedbackCard = ({ feedback }) => {

    const { name, address, review, img } = feedback;

    return (
        <div>
            <div className="card glass shadow-lg rounded-xl">

                <div className='px-8 pt-10 mx-auto'>
                    <p>{review}</p>
                </div>

                <div className="text-center flex justify-start my-8 px-8">
                    {/* <div className='px-8'>
                        <img className='w-[64px] border-4 border-primary rounded-full' src={img} alt="car!" />
                    </div> */}
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img}  alt='' />
                        </div>
                    </div>
                    <div className='my-auto'>
                        <h2 className="text-md text-semibold ml-4">{name}</h2>
                        <h3 className='-ml-4'>{address}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;