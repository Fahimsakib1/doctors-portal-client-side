import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center h-full mt-24'>
            <p className='font-semibold text-6xl'>L</p>
            <div className="h-10 w-10 border-8 border-dashed rounded-full animate-spin border-blue-600 mt-4"></div>
            <p className='font-semibold text-6xl'>ading...</p>
        </div>
    );
};

export default LoadingSpinner;