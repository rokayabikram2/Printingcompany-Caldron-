import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ImageData from '../../data/ImageData';
import ImageModal from './ImageModal';

const Images = () => {
    const { album } = useParams();
    const data = ImageData.filter(item => item.album === album)
    return (
        <>
            <section className={`bg-no-repeat bg-cover md:h-[300px] h-[150px] relative bg-[url('/src/assets/images/background.webp')]`}>
                <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
                <div className="container relative z-10 text-white flex items-center justify-center h-full">
                    <ul className='flex items-center gap-1 md:text-lg font-medium'>
                        <li className='text-color2'><NavLink to="/">Home</NavLink></li>
                        /
                        <li className='text-color2'><NavLink to="/ImageGallery">Image Gallery</NavLink></li>
                        /
                        <li>Images</li>
                    </ul>
                </div>
            </section>
            <section className='md:py-20 py-16 bg-color1 text-white'>
                <div className="container flex flex-col items-center gap-4">
                    <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{album}</h2>
                    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                        {data.map((dataItem, index) => (
                            <ImageModal key={dataItem.id} index={index} imageUrl={dataItem.imageUrl} images={data} />
                        ))} 
                    </div>
                </div>
            </section>
        </>
    )
}

export default Images;
