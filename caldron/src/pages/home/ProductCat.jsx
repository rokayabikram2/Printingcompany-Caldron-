import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const ProductCat = () => {

    const [productData, setProductData] = useState([]);
    const baseUrl = React.useContext(BaseUrlContext);

    const FetchProduct = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/product/`
            );
            // Filter the response data by status and page_type


            if (response.data) {
                const ProductDatas = response.data.filter(
                    (item) => item.status === "Publish" && item.page_type === "Product Details"
                );
                setProductData(ProductDatas); // Assuming you want to slice the filtered data
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Axios GET request to fetch data
        FetchProduct();
    }, []);

    const groupedData = {};

    productData.forEach((dataItem) => {
        if (!groupedData[dataItem.category]) {
            groupedData[dataItem.category] = {
                title: dataItem.category,
                thumbnailImage: dataItem.productimage,
                products: [dataItem],
            };
        } else {
            groupedData[dataItem.category].products.push(dataItem);
        }
    });

    return (
        <section className='md:py-20 py-16 bg-color4'>
            <div className="container flex flex-col md:items-start items-center gap-4">
                <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] 
                before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Product Category</h2>
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-10 gap-6 w-full'>
                    {Object.values(groupedData).map((dataItem, index) => (
                        <div key={index} className='w-full flex flex-col items-center group'>
                            <NavLink to={`/ProductCat/${dataItem.title}`} className='overflow-hidden inline-block w-full'>
                                <img className='w-full md:h-[250px] h-[230px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.thumbnailImage} alt={dataItem.title} />
                            </NavLink>
                            <span className='inline-block w-full bg-gray-900 text-white p-2'>
                                <h3 className='md:text-xl text-lg font-semibold text-center'>{dataItem.title}</h3>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCat;
