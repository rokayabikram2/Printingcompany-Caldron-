import React ,{useState,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const Banner = () => {
  
    const [banner, setBanner] = useState([]);
    const baseUrl = React.useContext(BaseUrlContext);


    const bannerData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            let newBanner=[...response.data]
            newBanner=newBanner.reverse()
            const sliderDatas = newBanner.filter(
                (item) => item.status === "Publish" && item.page_type === "Home/Slider"
            );
            setBanner(sliderDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        bannerData();
    }, []);
    

    return (
        <section className='w-full h-auto'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                style={{
                    '--swiper-pagination-bullet-size': '8px',
                    '--swiper-pagination-bullet-inactive-color': '#fff',
                    '--swiper-theme-color': '#EB1B8F',
                    '--swiper-pagination-bullet-inactive-opacity': '0.7'
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{ delay: 5000 }}
            >
                {banner.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className='w-full lg:h-[600px] md:h-[400px] h-[300px] object-cover' src={image.bannerimage} alt="banner-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Banner;
