import React from 'react';
import { NavLink } from 'react-router-dom';

const WhoWeAre = () => {
    return (
        <section className='md:py-20 py-16 bg-custom text-white'>
            <div className='container flex flex-col items-center gap-2'>
                <h1 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">About Us</h1>
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold text-center'> <span className='text-color2'>Caldron</span> Graphics Nepal Pvt. Ltd</h2>
                <p className='sm:text-base text-sm text-center'>Welcome to Caldron Graphics Nepal Pvt. Ltd.- leading players of Nepal’s signage industry for supply and operation of Signage machines, materials and latest outdoor and indoor advertising components and operated by the high class professionals with 10 years plus experience in this field.
                    Incepted in 2010, Caldron Graphics Nepal Pvt. Ltd is a cutting edge company established to cater the need of growing digital technology in country especially in the field of Digital Signage and equipments. The company is registered in the office of the company registrar of Nepal on 25March 2010 (Company registration number 71635/066/067). The Company’s registered address is Bansbari, Kathmandu-3 with Permanent Account Number (PAN) having 304220238 The company has been registered with the objective to harmonize the advertisement and distribution system through Digital Printing technology and production facilities.</p>
                <NavLink to="/AboutUs" className="flex items-center gap-2 font-medium text-white bg-black px-3 py-2 rounded">
                    Read More
                    <i className="fa-solid fa-arrow-right text-base"></i>
                </NavLink>
            </div>
        </section>
    )
}

export default WhoWeAre;
