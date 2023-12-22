import React,{useState,useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { BaseUrlContext } from '../../App';
import axios from 'axios';

const Products = () => {
    const { category, subCategory } = useParams();
    
    const [banner, setBanner] = useState();

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
                setProductData(ProductDatas.filter(item => item.category === category && item.sub_category === subCategory)); // Assuming you want to slice the filtered data
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const ProductData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );
            // Filter the response data by status and page_type
            if (response.data) {
                const bannerData = response.data.find(
                    (item) => item.status === "Publish" && item.page_type === "Product/slider"
                );
                setBanner(bannerData); // Assuming you want to slice the filtered data
            }  

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        // Axios GET request to fetch data
        ProductData();
        FetchProduct();
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
            {productData.map((dataItem, index) => {
              const encodePath = encodeURIComponent(dataItem.name)
              return (<div key={index} className='w-full flex flex-col items-center group'>
                <NavLink to={`/ProductCat/${category}/${subCategory}/${encodePath}`} className='overflow-hidden inline-block w-full'>
                  <img className='w-full md:h-[250px] h-[230px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.productimage} alt={dataItem.name} />
                </NavLink>
                <span className='inline-block w-full bg-gray-900 text-white p-2'>
                  <h3 className='md:text-lg text-base font-medium text-center'>{dataItem.name}</h3>
                </span>
              </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Products;