import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const ImageGallery = () => {
    

    const [banner, setBanner] = useState();
    const [imagegall, setImage] = useState([]);
    const baseUrl= React.useContext(BaseUrlContext);

    const ImageGalleryData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const bannerData = response.data.find(
                    (item) => item.status === "Publish" && item.page_type === "Image Gallery/slider"
                );
                setBanner(bannerData); // Assuming you want to slice the filtered data
            }

            // let newImage = [...response.data]
            // newImage = newImage.reverse()
            // const imageData = response.data.filter(
            //     (item) => item.status === "Publish" && item.page_type === "Image Gallery"
            // );
            // setImage(imageData);

            if (response.data) {
                const imageData = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Image Gallery"
                );
                setImage(imageData); // Assuming you want to slice the filtered data
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Axios GET request to fetch data
        ImageGalleryData();
    }, []);
    

    const groupedData = imagegall.reduce((result, item) => {
        const { title } = item;
        if (!result[title]) {
            result[title] = [];
        }
        result[title].push(item);
        return result;
    }, {});

    // Convert the grouped data into an array of objects
    const groupedArray = Object.keys(groupedData).map((title) => ({
        title,
        images: groupedData[title],
    }));

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
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute 
                    before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{banner && banner.title}</h2>
                    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                        {groupedArray.map((dataItem, index) => (
                            <div key={index} className='group p-2 rounded bg-white text-black shadow-[0_0_5px_2px_rgba(0,0,0,0.2)]'>
                                <NavLink to={`/ImageGallery/${dataItem.title}`} className="inline-block w-full overflow-hidden">
                                    <img className='w-full h-[200px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.images[0].bannerimage} alt={dataItem.title} />
                                </NavLink>
                                <h3 className='border-b font-medium'>{dataItem.title}</h3>
                                <p className='text-sm'>{dataItem.images[0].published_date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ImageGallery;
