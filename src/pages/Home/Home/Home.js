import React from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Address from '../Address/Address';
import AlgoliaPlacesSearch from '../AlgoliaPlaces/AlgoliaPlacesSearch';
import Banner from '../Banner/Banner';
import ContactUsForm from '../ContactUsForm/ContactUsForm';
import DentalCare from '../DentalCare/DentalCare';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import FeedbackCards from '../PatientSaying/FeedbackCards';
import ServiceCards from '../Services/ServiceCards'; 


const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            {/* <Address></Address> */}
            <InfoCards></InfoCards>
            <ServiceCards></ServiceCards>
            <DentalCare></DentalCare>
            <MakeAppointment></MakeAppointment>
            <FeedbackCards></FeedbackCards>
            <ContactUsForm></ContactUsForm>
        </div>
    );
};

export default Home;