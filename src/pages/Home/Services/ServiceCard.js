import React from 'react';

const ServiceCard = ({service}) => {
    
    const {name, img, desc} = service;
    
    return (
        <div>
            <div className="card glass shadow-lg rounded-xl">
                <figure className='mt-8 '>
                    <img src={img} alt="car!" />
                </figure>

                <div className="card-body text-center">
                    <h2 className="text-xl text-semibold">{name}</h2>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;