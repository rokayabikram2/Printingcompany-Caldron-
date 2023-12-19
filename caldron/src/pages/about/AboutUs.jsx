import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
// import WhatWeAreData from '../../data/WhatWeAreData';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const AboutUs = () => {
    const [company, setCompany] = useState([]);
    const [banner,setBanner] =useState([]);
    const [whoweAre, setwhoweAre] = useState([]);
    const baseUrl = React.useContext(BaseUrlContext);


    const comapnyData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );

            const companyDatas = response.data.find(
                (item) => item.status === "Publish" && item.page_type === "AboutUs"
            );
            setCompany(companyDatas);
            const bannerDatas = response.data.find(
              (item) => item.status === "Publish" && item.page_type === "WhoWeAre/Slider"
            );
            setBanner(bannerDatas);
            const whoweArerDatas = response.data.filter(
              (item) => item.status === "Publish" && item.page_type === "About/WhoWeAre"
            );
            setwhoweAre(whoweArerDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    useEffect(() => {
        comapnyData();
    }, []);

    const title = company.title || ""
    const words = title.split(" ")
    const firstWord = words[0]
    const otherWords = words.slice(1).join(" ")
  return (
    <>
       <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${banner && banner.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
        <div className="container relative z-10 text-white flex items-center justify-center h-full">
          <ul className='flex items-center gap-1 md:text-lg font-medium'>
            <li className='text-color2'><NavLink to="/">Home</NavLink></li>
            /
            <li>{company.name}</li>
          </ul>
        </div>
      </section>
      <section className='md:py-20 py-16 bg-color1 text-white'>
        <div className="container flex md:flex-row flex-col gap-6">
          <div className='md:w-2/3 w-full flex flex-col items-start gap-2'>
            <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold'><span className='text-color2'>{firstWord} </span>{otherWords}</h2>
            <div className='sm-text-base text-sm'>
              <p dangerouslySetInnerHTML={{__html:company.desc}}></p>
            </div>
          </div>
          <div className='md:w-1/3 w-full'>
            <img className='w-full lg:h-[350px] h-[300px] object-cover' src={company.bannerimage} alt="company-profile" />
          </div>
        </div>
      </section>
      <section className='md:py-20 py-16 bg-color4'>
        <div className="container flex flex-col items-center gap-4">
          <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Who We Are</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 gap-6 w-full">
            {whoweAre.map((dataItem) => (
              <div key={dataItem.id} className='flex flex-col items-center md:gap-3 gap-2 p-3 border rounded-xl bg-gray-100'>
                <h3 className='md:text-xl text-lg font-semibold'>{dataItem.title}</h3>
                <p className='text-center sm:text-base text-sm' dangerouslySetInnerHTML={{__html:dataItem.desc.substring(0, 200)}}></p>
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
