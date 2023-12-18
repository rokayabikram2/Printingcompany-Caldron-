import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import ProductData from '../../data/ProductData';

const Products = () => {
  const { category, subCategory } = useParams();
  const data = ProductData.filter(item => item.category === category && item.subCategory === subCategory)
  return (
    <>
      <section className={`bg-no-repeat bg-cover md:h-[300px] h-[150px] relative bg-[url('/src/assets/images/background.webp')]`}>
        <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
        <div className="container relative z-10 text-white flex items-center justify-center h-full">
          <ul className='flex items-center gap-1 md:text-lg font-medium'>
            <li className='text-color2'><NavLink to="/">Home</NavLink></li>
            /
            <li className='text-color2'><NavLink to={`/ProductCat/${category}`}>subCategory</NavLink></li>
            /
            <li>Products</li>
          </ul>
        </div>
      </section>
      <section className='md:py-20 py-16 bg-color1 text-white'>
        <div className="container flex flex-col items-center gap-4">
          <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-color1 before:bottom-0 before:z-10 before:animate-slow-motion">{subCategory}</h2>
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6 w-full'>
            {data.map((dataItem, index) => (
              <div key={index} className='w-full flex flex-col items-center group'>
                <NavLink to={`/ProductCat/${category}/${subCategory}/${dataItem.product}`} className='overflow-hidden inline-block w-full'>
                  <img className='w-full md:h-[250px] h-[230px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.imageUrl} alt={dataItem.product} />
                </NavLink>
                <span className='inline-block w-full bg-gray-900 text-white p-2'>
                  <h3 className='md:text-xl text-lg font-semibold text-center'>{dataItem.product}</h3>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Products;
