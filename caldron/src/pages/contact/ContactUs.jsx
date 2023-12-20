import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const ContactUs = () => {
    const [contacts,setContacts] = useState([]);
    const [global,setGlobal] = useState([])
    const baseUrl = React.useContext(BaseUrlContext);

    const contactData= async () =>{
      try {
          const response = await axios.get(
              `${baseUrl}/navigations/`
          );
          
          const contactsDatas = response.data.find(
              (item) => item.status ==="Publish" && item.page_type ==="Contact us"
  
          );
          setContacts(contactsDatas);

          const responses = await axios.get(`${baseUrl}/globals/`);
          responses.data && setGlobal(responses.data[0]);
  
      
      }catch (error){
          console.error("Error on fetching data:",error);
  
  
      }
  
    };

    useEffect(() => {
        contactData();
      
    },[]);

    const initialForm = {
        name: '',
        mobile: '',
        email: '',
        subject: '',
        message: '',
    }
    const [form, setForm] = useState(initialForm)
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(
                `${baseUrl}/contacts/`,  // Update with your Django API endpoint
                form
            );
            
            // Display success message
            // setSuccessMessage("Contact form submitted successfully!");
            alert("Contact form submitted successfully!")
    
            
            // Clear the form after submission
            setForm(initialForm);
    
    
        }catch (error) {
          console.error("Error on fetching data:", error);
      
          
        }
    };

    return (
        <>
            <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${contacts && contacts.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li>{contacts.name}</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex flex-col items-center gap-4">
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] 
                    before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">Get In Touch</h2>
                    <div className="flex xl:flex-row flex-col xl:gap-6 gap-8 w-full items-center">
                        <div className='xl:w-1/2 lg:w-2/3 w-full flex flex-col bg-white text-black items-start gap-3 p-4 rounded-lg shadow-[0_0_5px_2px_rgba(0,0,0,0.1)]'>
                            <h3 className='md:text-xl text-lg font-semibold'>Send feedback</h3>
                            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2 w-full sm:text-base text-sm'>
                                <div className='flex sm:flex-row flex-col sm:gap-5 gap-2 w-full'>
                                    <div className='flex flex-col items-start sm:w-1/2 w-full'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id='name' name='name' required value={form.name} onChange={handleInputChange} className='border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col items-start sm:w-1/2 w-full'>
                                        <label htmlFor="mobile">Phone</label>
                                        <input type="tel" id='mobile' name='mobile' required value={form.mobile} onChange={handleInputChange} className='border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none' />
                                    </div>
                                </div>
                                <div className='flex sm:flex-row flex-col sm:gap-5 gap-2 w-full'>
                                    <div className='flex flex-col items-start sm:w-1/2 w-full'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id='email' name='email' required value={form.email} onChange={handleInputChange} className='border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col items-start sm:w-1/2 w-full'>
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" id='subject' name='subject' value={form.subject} onChange={handleInputChange} className='border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none' />
                                    </div>
                                </div>
                                <div className='flex flex-col items-start w-full'>
                                    <label htmlFor="message">Message</label>
                                    <textarea type="text" id='message' name='message' rows="5" value={form.message} onChange={handleInputChange} className='border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none' />
                                </div>
                                <input type="submit" value="SUBMIT" className='font-medium text-white bg-black px-3 py-2 rounded cursor-pointer' />
                            </form>
                        </div>
                        <div className='xl:w-1/2 w-full flex flex-col sm:items-center items-start gap-2'>
                            <h3 className='md:text-xl text-lg font-semibold'>{global.SiteName}</h3>
                            <div className='flex sm:flex-row flex-col justify-center w-full gap-6'>
                                <div className='flex items-center gap-2'>
                                    <i className="fa-solid fa-location-dot text-sm p-2 text-white bg-gray-900"></i>
                                    <span>
                                        <p className='md:text-lg text-base font-medium'>Location</p>
                                        <a href='https://maps.app.goo.gl/P4HT3BgZRz9Um5R6A' target='_blank' rel='noreferrer'>
                                        <p className='text-gray-100 text-sm'>{global.SiteAddress}</p>
                                        </a>
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <i className="fa-solid fa-phone text-sm p-2 text-white bg-gray-900"></i>
                                    <span>
                                        <p className='md:text-lg text-base font-medium'>Contact</p>
                                        <a href={`{tel:${global.SiteContact}`}>
                                        <p className='text-gray-100 text-sm'>{global.SiteContact}</p>
                                        </a>

                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <i className="fa-solid fa-envelope text-sm p-2 text-white bg-gray-900"></i>
                                    <span>
                                        <p className='md:text-lg text-base font-medium'>Email</p>
                                        <a href={`mailto:${global.SiteEmail}`}>
                                        <p className='text-gray-100 text-sm'>{global.SiteEmail}</p>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='w-full md:h-[350px] h-[250px] my-4'>
                <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.0127797679606!2d85.3418824760729!3d27.74775182370712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194df9aa4eff%3A0xaf4b9c99b44bebb5!2sCaldron%20Graphics%20Nepal%2C%20Apex%20Nepal%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1701583407834!5m2!1sen!2snp" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </>
    )
}

export default ContactUs;
