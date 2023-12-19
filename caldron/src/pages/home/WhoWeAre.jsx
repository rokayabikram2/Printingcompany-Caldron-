import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';


const WhoWeAre = () => {
    const [intro, setIntro] = useState({});
    const baseUrl = React.useContext(BaseUrlContext);

    const introData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );

            const introDatas = response.data.find(
                (item) => item.status === "Publish" && item.page_type === "Home/Aboutus"
            );
            setIntro(introDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        introData();
    }, []);

    const title = intro.title || ""
    const words = title.split(" ")
    const firstWord = words[0]
    const otherWords = words.slice(1).join(" ")
    return (
        <section className='md:py-20 py-16 bg-custom text-white'>
            <div className='container flex flex-col items-center gap-2'>
                <h1 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">About Us</h1>
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold text-center'> <span className='text-color2'>{firstWord}</span> {otherWords}</h2>
                <p className='sm:text-base text-sm text-center' dangerouslySetInnerHTML={{__html:intro.desc}}></p>
                <NavLink to="/AboutUs" className="flex items-center gap-2 font-medium text-white bg-black px-3 py-2 rounded">
                    Read More
                    <i className="fa-solid fa-arrow-right text-base"></i>
                </NavLink>
            </div>
        </section>
    )
}

export default WhoWeAre;
