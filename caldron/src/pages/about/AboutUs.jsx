import React from 'react'
import { NavLink } from 'react-router-dom';
import WhatWeAreData from '../../data/WhatWeAreData';

const AboutUs = () => {
  return (
    <>
      <section className={`bg-no-repeat bg-cover md:h-[300px] h-[150px] relative bg-[url('/src/assets/images/background.webp')]`}>
        <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
        <div className="container relative z-10 text-white flex items-center justify-center h-full">
          <ul className='flex items-center gap-1 md:text-lg font-medium'>
            <li className='text-color2'><NavLink to="/">Home</NavLink></li>
            /
            <li>About Us</li>
          </ul>
        </div>
      </section>
      <section className='md:py-20 py-16 bg-color1 text-white'>
        <div className="container flex md:flex-row flex-col gap-6">
          <div className='md:w-2/3 w-full flex flex-col items-start gap-2'>
            <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold'><span className='text-color2'>15 Years</span> of experience</h2>
            <div className='sm-text-base text-sm'>
              <p>Welcome to Caldron Graphics Nepal Pvt. Ltd.- leading players of Nepal’s signage industry for supply and operation of Signage machines, materials and latest outdoor and indoor advertising components and operated by the high class professionals with 10 years plus experience in this field.</p>
              <p>Incepted in 2010, Caldron Graphics Nepal Pvt. Ltd is a cutting edge company established to cater the need of growing digital technology in country especially in the field of Digital Signage and equipments. The company is registered in the office of the company registrar of Nepal on 25March 2010 (Company registration number 71635/066/067). The Company’s registered address is Bansbari, Kathmandu-3 with Permanent Account Number (PAN) having 304220238 The company has been registered with the objective to harmonize the advertisement and distribution system through Digital Printing technology and production facilities.</p>
            </div>
          </div>
          <div className='md:w-1/3 w-full'>
            <img className='w-full lg:h-[350px] h-[300px] object-cover' src="/src/assets/images/profile.webp" alt="company-profile" />
          </div>
        </div>
      </section>
      <section className='md:py-20 py-16 bg-color4'>
        <div className="container flex flex-col items-center gap-4">
          <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Who We Are</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 gap-6 w-full">
            {WhatWeAreData.map((dataItem) => (
              <div key={dataItem.id} className='flex flex-col items-center md:gap-3 gap-2 p-3 border rounded-xl bg-gray-100'>
                <h3 className='md:text-xl text-lg font-semibold'>{dataItem.title}</h3>
                <p className='text-center sm:text-base text-sm'>{dataItem.description.substring(0, 200)}</p>
                <NavLink to={`/AboutUs/${dataItem.title}`} className="flex items-center gap-1 text-sm font-medium text-white bg-black px-2 py-1 rounded">Read More</NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs;
