import React,{useState,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const Client = () => {
   
    const [client, setClient] = useState([])
    const baseUrl = React.useContext(BaseUrlContext);

    const clientData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            let newClient = [...response.data]
            newClient = newClient.reverse()
            const clientdatas = newClient.filter(
                (item) => item.status === "Publish" && item.page_type === "Clients"
            );
            // setClient(clientdatas ? clientdatas : []);
            setClient(clientdatas);


        } catch (error) {
            console.error("Error on fetching data:", error);
        }
    };

    useEffect(() => {
        clientData()
    }, []);

    return (
        <section className='md:py-20 py-16 bg-color1'>
            <div className="container flex flex-col items-center gap-4">
                <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">Clients</h2>
                <div className='w-full'>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={50}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        // centeredSlides={true}
                        slidesPerView={3}
                        style={{
                            '--swiper-pagination-bullet-size': '10px',
                            '--swiper-pagination-bullet-inactive-color': '#fff',
                            '--swiper-theme-color': '#EB1B8F',
                            '--swiper-pagination-bullet-inactive-opacity': '0.7',
                            '--swiper-navigation-button-prev-size': '10px',
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 80
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 100
                            },
                            1280:{
                                slidesPerView: 6,
                                spaceBetween: 100
                            }
                        }}
                    >
                        {client.map((image, index) => (
                            <SwiperSlide key={index} className=''>
                                <img className='md:h-[50px] h-[40px] w-full bg-white p-2' src={image.bannerimage} alt="client-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section >
    )
}

export default Client;
