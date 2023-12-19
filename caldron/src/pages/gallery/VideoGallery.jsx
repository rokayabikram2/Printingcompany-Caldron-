import React,{useEffect,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { BaseUrlContext } from '../../App';
import axios from 'axios';

const VideoGallery = () => {
   
    const [banner, setBanner] = useState();
    const [videosgall, setVideo] = useState([]);
    const baseUrl= React.useContext(BaseUrlContext);

    const VideoGalleryData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const bannerData = response.data.find(
                    (item) => item.status === "Publish" && item.page_type === "Video Gallery/slider"
                );
                setBanner(bannerData); // Assuming you want to slice the filtered data
            }

            if (response.data) {
                const videoData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Video Gallery"
                );
                setVideo(videoData.reverse()); // Assuming you want to slice the filtered data
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Axios GET request to fetch data
        VideoGalleryData();
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
                        <li>{banner && banner.title}</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex flex-col items-center gap-4">
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded
                     before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{banner && banner.title}</h2>
                    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                        {videosgall.map((vid, index) => (
                            <video key={index} src={vid.video} type="video/mp4" controls className='w-full h-[200px]'></video>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default VideoGallery;
