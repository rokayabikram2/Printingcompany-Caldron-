import React from 'react'
import { NavLink } from 'react-router-dom';
import ImageData from '../../data/ImageData';

const ImageGallery = () => {
    const groupedData = ImageData.reduce((result, item) => {
        const { album } = item;
        if (!result[album]) {
            result[album] = [];
        }
        result[album].push(item);
        return result;
    }, {});

    // Convert the grouped data into an array of objects
    const groupedArray = Object.keys(groupedData).map((album) => ({
        album,
        images: groupedData[album],
    }));

    return (
        <>
            <section className={`bg-no-repeat bg-cover md:h-[300px] h-[150px] relative bg-[url('/src/assets/images/background.webp')]`}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li>Image Gallery</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex flex-col items-center gap-4">
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">Image Gallery</h2>
                    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                        {groupedArray.map((dataItem, index) => (
                            <div key={index} className='group p-2 rounded bg-white text-black shadow-[0_0_5px_2px_rgba(0,0,0,0.2)]'>
                                <NavLink to={`/ImageGallery/${dataItem.album}`} className="inline-block w-full overflow-hidden">
                                    <img className='w-full h-[200px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.images[0].imageUrl} alt={dataItem.album} />
                                </NavLink>
                                <h3 className='border-b font-medium'>{dataItem.album}</h3>
                                <p className='text-sm'>{dataItem.images[0].date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ImageGallery;
