import React,{useState,useEffect} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const WhyUs = () => {
  const [us, setUs] = useState([]);
  const [qualities, setqualities] = useState([]);

  const baseUrl = React.useContext(BaseUrlContext);


  const usData = async () => {
      try {
          const response = await axios.get(
              `${baseUrl}/navigations/`
          );

          const usDatas = response.data.find(
              (item) => item.status === "Publish" && item.page_type === "WhyChooseUs"
          );
          setUs(usDatas);

          const qualitiesDatas = response.data.filter(
            (item) => item.status === "Publish" && item.page_type === "WhyChoose Us/Qualities"
          );
          setqualities(qualitiesDatas);
          
      } catch (error) {
          console.error("Error fetching data:", error);

      }
  }

  useEffect(() => {
    usData();
  }, []);
  // console.log(us)
  // console.log(qualities)

  return (
    <section className='md:py-20 py-16 bg-color1 text-white'>
      <div className="container flex lg:flex-row flex-col lg:gap-4 gap-8">
        <div className='flex flex-col lg:items-start items-center gap-4 lg:w-2/3 w-full'>
          <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-['']
           before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{us.name}</h2>
          <div className='sm:text-base text-sm sm:text-left text-center'>
            <p dangerouslySetInnerHTML={{__html:us.desc}}></p>
          </div>
        </div>
        <div className={`lg:w-1/3 w-full grid grid-cols-2 gap-5 h-[350px] ${qualities.length > 4 ? 'overflow-y-scroll' : ''}`}>
          {qualities.map((dataItem) => (
            <div key={dataItem.id} className='flex flex-col items-center gap-2 group relative overflow-hidden'>
              <div style={{ width: '100px', height: '100px' }}>
                <CircularProgressbar
                  value={dataItem.country}
                  text={`${dataItem.country}%`}
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
