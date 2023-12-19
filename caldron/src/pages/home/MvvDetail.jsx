import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BaseUrlContext } from '../../App';
import axios from 'axios';

const MvvDetail = () => {
    const { title } = useParams();
    const [mission, setMission] = useState([]);
    const [slide,setSlide] =useState([])
    const baseUrl = React.useContext(BaseUrlContext);



  const missionData = async () => {
      try {
          const response = await axios.get(
              `${baseUrl}/navigations/`
          );

          const missionDatas = response.data.filter(
              (item) => item.status === "Publish" && item.page_type === "Mission & Vision"
          );
          setMission(missionDatas.find(data => data.title === title));
          
          const sliderDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "M&V/Slider"
          );
          setSlide(sliderDatas[0]);


      } catch (error) {
          console.error("Error fetching data:", error);

      }
  }
//   console.log(slide);

  useEffect(() => {
      missionData();
  }, []);



    return (
        <>
            <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${slide && slide.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li>{title}</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex md:flex-row flex-col gap-6">
                    <div className='flex flex-col items-start gap-2 md:w-2/3 w-full'>
                        <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] 
                        before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{mission.title}</h2>
                        <p className='sm:text-base text-sm' dangerouslySetInnerHTML={{__html:mission.desc}}></p>
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <img className='w-full sm:h-[320px] h-[280px] object-cover' src={mission.bannerimage} alt={title} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default MvvDetail;
