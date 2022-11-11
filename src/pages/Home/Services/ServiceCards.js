import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import teeth from '../../../assets/images/whitening.png';
import ServiceCard from './ServiceCard';

const ServiceCards = () => {

    const services = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            img: fluoride,
            desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, tempora.'
        },

        {
            id: 2,
            name: 'Cavity Filling',
            img: cavity,
            desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, tempora.'
        },

        {
            id: 3,
            name: 'Teeth Whitening',
            img: teeth,
            desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, tempora.'
        },


    ]

    return (
        <div>
            
            <div className='text-center mt-16'>
                <p className='text-2xl text-primary mb-4'>Our Services</p>
                <h1 className='text-5xl'>Services We Provide</h1>
            </div>
            
            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-6'>
                {
                    services.map(service => <ServiceCard key={service.id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default ServiceCards;