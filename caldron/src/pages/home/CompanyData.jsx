import React, { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Data from '../../data/Profile';
import { NavLink } from 'react-router-dom';

const CompanyData = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <section className={`md:py-20 py-16 flex items-center relative bg-gray-950`}>
            <div className="container relative w-full z-20 text-white">
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-10'>
                    {Data.map((dataItem) => (
                        <NavLink to={`/CompanyData/${dataItem.title}`} key={dataItem.id} className="flex flex-col gap-2 items-center bg-white bg-opacity-20 py-5 border border-gray-300 rounded-md relative after:absolute after:w-full after:h-full after:bg-black after:inset-0 after:flex after:items-center after:justify-center after:rounded-md after:opacity-0 hover:after:bg-opacity-60 hover:after:opacity-100 after:underline after:transition-all after:duration-200 after:ease-linear" >
                            <i className={`${dataItem.icon} md:text-xl text-lg`}></i>
                            <VisibilitySensor
                                onChange={(isVisible) => {
                                    if (isVisible) {
                                        setIsVisible(true);
                                    }
                                }}>
                                <CountUp className='md:text-2xl text-xl font-semibold text-color4' end={isVisible ? dataItem.number : 0} duration={3} formattingFn={(value) => `${value}+`} />
                            </VisibilitySensor>
                            <h3 className='lg:text-2xl md:text-xl text-lg font-medium text-center'>{dataItem.title.toUpperCase()}</h3>
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CompanyData;

