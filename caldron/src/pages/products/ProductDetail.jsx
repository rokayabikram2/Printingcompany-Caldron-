import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../../App';



const ProductDetail = () => {
  const { category, subCategory, encodedProductPath } = useParams();
  const name = decodeURIComponent(encodedProductPath);
  // const data = ProductData.find(item => item.category === category && item.subCategory === subCategory && item.product === product);
  // const otherProducts = ProductData.filter(item => item.category === category && item.subCategory === subCategory && item.product !== product)
  // console.log(data)

    const [banner, setBanner] = useState();
    const [productData, setProductData] = useState([]);
    const [otherProduct, setOtherProduct] = useState([]);
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
                setProductData(ProductDatas.find(item => item.category === category && item.sub_category === subCategory && item.name === name)); // Assuming you want to slice the filtered data
            }
            if (response.data) {
              const otherProductDatas = response.data.filter(
                  (item) => item.status === "Publish" && item.page_type === "Product Details"
              );
              setOtherProduct(otherProductDatas.filter(item => item.category === category && item.sub_category === subCategory && item.name !== name)); // Assuming you want to slice the filtered data
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
    console.log(productData)
  return (
    <>
      <section className={`md:h-[300px] h-[150px] relative`} 
            style={{backgroundImage: `url(${banner && banner.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="absolute w-full h-full inset-0 bg-black opacity-80"></div>
        <div className="container relative z-10 text-white flex items-center justify-center h-full">
          <ul className='flex sm:flex-row flex-col items-center gap-1 md:text-lg font-medium'>
            <div className='flex items-center gap-1'>
              <li className='text-color2'><NavLink to="/">Home</NavLink></li>
              /
              <li className='text-color2'><NavLink to={`/ProductCat/${category}`}>subCategory</NavLink></li>
              /
            </div>
            <div className='flex items-center gap-1'>
              <li className='text-color2'><NavLink to={`/ProductCat/${category}/${subCategory}`}>Products</NavLink></li>
              /
              <li>Product Details</li>
            </div>
          </ul>
        </div>
      </section>
      {productData && (
      <section className='md:py-20 py-16 bg-color1 text-white'>
        <div className="container flex lg:flex-row flex-col gap-6">
          <div className='lg:w-1/3 w-full'>
            <img src={productData.productimage} className='w-full sm:h-[350px] h-[300px] object-cover' alt={productData.name}/>
            {productData.key_features && (
              <div className='flex flex-col items-start gap-2 mt-8'>
                <h3 className='text-xl font-medium text-color2'>Key features</h3>
                <div className='flex flex-col items-start gap-2 p-4 border border-gray-300 bg-gray-100 bg-opacity-10'>
                  <p className='text-white' dangerouslySetInnerHTML={{__html:productData.key_features}}></p>
                  {/* {productData.key_features.map((item, index) => (
                    <p key={index} className='text-sm'><i className="fa-solid fa-arrow-right text-xs me-1 text-color2"></i>{item}</p>
                  ))} */}
                </div>
              </div>
            )}
          </div>
          <div className='lg:w-2/3 w-full flex flex-col items-start md:gap-2 gap-1'>
            <small className='sm:text-xl text-lg font-medium text-gray-200'>{category}</small>
            <h2 className='lg:text-4xl md:text-3xl text-2xl font-semibold'>{name.toUpperCase()}</h2>
            <p className='sm:text-base text-sm' dangerouslySetInnerHTML={{__html:productData.product_desc}}></p>
            {productData.specification && (
              <div className='flex flex-col items-start gap-2 mt-3 xl:w-[80%] w-full'>
                <h3 className='text-xl font-medium border-b border-color2 '>Specification</h3>
                <div className='w-full'>
                  <p dangerouslySetInnerHTML={{__html:productData.specification}}></p>
                  {/* {productData.specification.map((item, index) => {
                    const key = Object.keys(item)
                    const value = item[key]
                    return (<div key={index} className={`grid grid-cols-6 gap-4 w-full p-1 sm:text-sm text-xs ${index % 2 === 0 ? 'bg-gray-500': 'bg-gray-100 text-black'}`}>
                      <p className='col-start-1 col-end-3'>{key}</p>
                      <p className='col-start-3 col-end-7'>{value}</p>
                    </div>
                    )
                  })} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}
      {otherProduct.length > 0 && (
        <section className='md:py-20 py-16 bg-color4'>
          <div className="container flex flex-col items-start gap-4">
            <h2 className="md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Similar Products</h2>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6 w-full'>
              {otherProduct.map((dataItem, index) => {
                const encodePath = encodeURIComponent(dataItem.name)
                return (<div key={index} className='w-full flex flex-col items-center group'>
                  <NavLink to={`/ProductCat/${category}/${subCategory}/${encodePath}`} className='overflow-hidden inline-block w-full'>
                    <img className='w-full md:h-[250px] h-[230px] object-cover group-hover:scale-110 transition-all duration-200 ease-linear' src={dataItem.productimage} alt={dataItem.name} />
                  </NavLink>
                  <span className='inline-block w-full bg-gray-900 text-white p-2'>
                    <h3 className='md:text-lg text-base font-semibold text-center'>{dataItem.name}</h3>
                  </span>
                </div>
                )})}
            </div>
          </div>
        </section>
      )
      }
    </>
  )
}

export default ProductDetail;