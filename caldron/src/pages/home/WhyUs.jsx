import React from 'react';
import WhyUsData from '../../data/WhyUsData';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';

const WhyUs = () => {

  return (
    <section className='md:py-20 py-16 bg-color1 text-white'>
      <div className="container flex lg:flex-row flex-col lg:gap-4 gap-8">
        <div className='flex flex-col lg:items-start items-center gap-4 lg:w-2/3 w-full'>
          <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">Why Choose Us</h2>
          <div className='sm:text-base text-sm sm:text-left text-center'>
            <p>For over a decade Caldron Graphics Nepal has been providing services in sector of signage machines and related materials and services to the people of Nepal.
              Developed nations around the world has prosper greatly in the field of printing by the help of printer companies like Crystal-Jet, Xenons and world renowned HP brand& which Caldron Graphics Nepal is the official distributor for our country. Since 2074we have added Toshiba Print-heads UV and Eco-solvent Printers and HP Brand Large Format Printers to our previous line of printers i.e. Xaar, Seiko ,EPSONPrint-heads technology.</p>
            <p>To introduce latest and greatest technologies in signage Industry in Nepal our company is always dedicated to find best quality materials at reasonable price so that everyone could have access to signage based advertisement to boon their businesses. Beside Signage Industry related machines we also deal in Printing Medias, Inks, Display Items,Gift items, Promotional Items and Spare Parts. We also provide after sales maintenance service all over Nepal.</p>
          </div>
        </div>
        <div className={`lg:w-1/3 w-full grid grid-cols-2 gap-5 h-[350px] ${WhyUsData.length > 4 ? 'overflow-y-scroll' : ''}`}>
          {WhyUsData.map((dataItem) => (
            <div key={dataItem.id} className='flex flex-col items-center gap-2 group relative overflow-hidden'>
              <div style={{ width: '100px', height: '100px' }}>
                <CircularProgressbar
                  value={dataItem.rate}
                  text={`${dataItem.rate}%`}
                  styles={buildStyles({
                    textColor: '#fff',
                    pathColor: '#22AEE4',
                    trailColor: '#eee',
                    textSize: '18px'
                  })}
                />
              </div>
              <h3 className='md:text-xl lg:text-lg lg:block hidden text-center font-medium'>{dataItem.title}</h3>
              <h3 className='lg:hidden block text-lg text-center font-medium'>
                <NavLink to={`/WhyUs/${dataItem.title}`}>
                  {dataItem.title}
                </NavLink>
              </h3>
              <NavLink to={`/WhyUs/${dataItem.title}`} className="lg:flex hidden absolute xl:w-auto w-[53%] py-1 px-2 bg-black text-white text-xs rounded left-1/2 -translate-x-1/2 bottom-[30px] opacity-0 group-hover:opacity-100 group-hover:bottom-1/2 group-hover:-translate-y-1/2 transition-all duration-200 ease-linear text-center">Read More</NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs;
