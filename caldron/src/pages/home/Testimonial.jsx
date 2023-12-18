import React,{useState,useEffect} from 'react';
// import TestimonialData from '../../data/TestimonialData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { BaseUrlContext } from '../../App';
import axios from 'axios';


const Testimonial = () => {
    const swiperParams = {
        spaceBetween: 10,
        loop: true,
        autoplay: { delay: 5000 },
        breakpoints: {
            1024: {
                slidesPerView: 2,
            }
        }
    }
    const [testi, setTesti] = useState([])
    const baseUrl = React.useContext(BaseUrlContext);


    const testiData = async () =>{
        try{
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            let newtest=[...response.data]
            newtest=newtest.reverse()
            const testiData = newtest.filter(
                (item) => item.status === "Publish" && item.page_type ==="Testimonial"
            );
            
            setTesti(testiData);


        }catch (error){
            console.error("Error on fetching data:",error);
        }
    };
    console.log(testi);
    useEffect(() => {
        testiData();
    }, []);
    return (
        <section className="md:py-20 py-16 relative bg-cover bg-fixed bg-no-repeat text-white" style={{ backgroundImage: `url('/src/assets/images/background.webp')` }}>
            <div className='absolute w-full h-full inset-0 bg-black opacity-90'></div>
            <div className="container flex flex-col items-center gap-4 relative z-10">
                <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Testimonials</h2>
                <div className="flex flex-wrap -m-4 w-full">
                    <Swiper {...swiperParams} modules={[Navigation, A11y, Autoplay]}>
                        {testi.map((dataItem) => (
                            <SwiperSlide key={dataItem.id}>
                                <div className="p-4 w-full">
                                    <div className="h-full bg-white bg-opacity-30 border border-gray-300 sm:p-8 p-4 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-4 h-4 text-color2 mb-2" viewBox="0 0 975.036 975.036">
                                            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                        </svg>
                                        <p className="leading-relaxed sm:mb-6 mb-4 sm:text-base text-sm text-left" dangerouslySetInnerHTML={{__html:dataItem.desc}}></p>
                                        <a className="inline-flex items-center">
                                            <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                            <span className="flex-grow flex flex-col pl-4">
                                                <span className="title-font font-medium text-black">{dataItem.name}</span>
                                                <span className="text-gray-200 text-sm">{dataItem.title.toUpperCase()}</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section >
    )
}

export default Testimonial;
