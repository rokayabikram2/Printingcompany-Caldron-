import React from 'react';
import Banner from './Banner';
import WhoWeAre from './WhoWeAre';
import WhyUs from './WhyUs';
import Client from './Client';
import Testimonial from './Testimonial';
import Mvv from './Mvv';
import CompanyData from './CompanyData';
import ProductCat from './ProductCat';
import OrderForm from './OrderForm';

const HomePage = () => {
    return (
        <>
            <Banner />
            <WhoWeAre />
            <ProductCat />
            <OrderForm />
            <WhyUs />
            <CompanyData />
            <Mvv />
            <Testimonial />
            <Client />
        </>
    )
}

export default HomePage;
