import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
// import WhatWeAreData from '../../data/WhatWeAreData';
import axios from 'axios';
import { BaseUrlContext } from '../../App';


const WwaDetail = () => {
    const { title } = useParams();
    // const data = WhatWeAreData.find(item => item.title === title)
    const [banner,setBanner] =useState([]);
    const [whoweAre, setwhoweAre] = useState([]);
    const baseUrl = React.useContext(BaseUrlContext);


    const comapnyData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            const bannerDatas = response.data.find(
              (item) => item.status === "Publish" && item.page_type === "WhoWeAre/Slider"
            );
            setBanner(bannerDatas);
            const whoweArerDatas = response.data.filter(
              (item) => item.status === "Publish" && item.page_type === "About/WhoWeAre"
            );
            setwhoweAre(whoweArerDatas.find(item => item.title === title));
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    useEffect(() => {
        comapnyData();
    }, []);
    return (
        <>
            <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${banner && banner.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li className='text-color2'><NavLink to="/AboutUs">About Us</NavLink></li>
                        /
                        <li>{title}</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container sm:flex-row flex-col flex gap-6">
                    <div className='md:w-1/3 w-full'>
                        <img className='w-full sm:h-[300px] h-[280px] object-cover' src={whoweAre.bannerimage} alt={title} />
                    </div>
                    <div className='md:w-2/3 w-full flex flex-col items-start gap-2'>
                        <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] 
                        before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{title}</h2>
                        <p className='sm:text-base text-sm' dangerouslySetInnerHTML={{__html:whoweAre.desc}}></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WwaDetail;
