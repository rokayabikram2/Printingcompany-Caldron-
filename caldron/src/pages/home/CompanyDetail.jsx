import React, { useState,useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const CompanyDetail = () => {
    const { title } = useParams();

    const [company, setCompany] = useState([]);
    const [banner,setBanner]= useState([]);
    const baseUrl = React.useContext(BaseUrlContext);


    const companyData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );

            const companyDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "CompanyData Details"
            );
            setCompany(companyDatas.find(item => item.title === title));
            const companyDetailsDatas = response.data.find(
                (item) => item.status === "Publish" && item.page_type === "CompanyData/Slider"
            );
            setBanner(companyDetailsDatas);
            
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        companyData();
    }, []);

    console.log(company)
    return (
        <>
            <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${banner && banner.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li>{banner.title}</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex flex-col items-center gap-4">
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-['']
                    before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{company.title}</h2>
                    <div className='w-full'>
                        <p className='sm:text-base text-sm' dangerouslySetInnerHTML={{__html:company.desc}}></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CompanyDetail;
