import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { BaseUrlContext } from '../../App';

const OrderForm = () => {
    const [order, setOrder] = useState({});
    const baseUrl = React.useContext(BaseUrlContext);

    const [productData, setProductData] = useState([]);

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

    const orderData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );

            const orderDatas = response.data.find(
                (item) => item.status === "Publish" && item.page_type === "order Product"
            );
            setOrder(orderDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        orderData();
        FetchProduct();
    }, []);
    const groupedData = {};

    productData.forEach((dataItem) => {
        if (!groupedData[dataItem.category]) {
            groupedData[dataItem.category] = {
                category: dataItem.category,
                thumbnailImage: dataItem.productimage,
                products: [dataItem],
            };
        } else {
            groupedData[dataItem.category].products.push(dataItem);
        }
    });

    const initialForm = {
        name: '',
        mobile: '',
        email: '',
        product: '',
        message: '',
    }
    const [form, setForm] = useState(initialForm)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) =>({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(
                `${baseUrl}/applies/`,  // Update with your Django API endpoint
                form
            );
            
            // Display success message
            // setSuccessMessage("Contact form submitted successfully!");
            alert("Contact form submitted successfully!")
    
            
            setForm(initialForm);
    
    
        }catch (error) {
          console.error("Error on fetching data:", error);
      
          
        }
    };
    return (
        <section className="md:py-20 py-16 relative" style={{backgroundImage: `url(${order && order.bannerimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className="absolute w-full h-full inset-0 bg-black opacity-90"></div>
            <div className="container flex flex-col items-center gap-4 relative">
                <h2 className="text-white md:text-2xl text-xl font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Order Product</h2>
                <form onSubmit={handleSubmit} className='lg:w-1/2 w-full p-8 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded flex flex-col items-center gap-2 bg-white sm:text-base text-sm' >
                    <div className='flex sm:flex-row flex-col sm:gap-5 gap-2 w-full'>
                        <div className='flex flex-col items-start sm:w-1/2 w-full'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' name='name' required value={form.name} onChange={handleInputChange} className='border border-gray-600 p-1 rounded w-full text-gray-600 focus:outline-none bg-transparent' />
                        </div>
                        <div className='flex flex-col items-start sm:w-1/2 w-full'>
                            <label htmlFor="mobile">Phone</label>
                            <input type="tel" id='mobile' name='mobile' required value={form.mobile} onChange={handleInputChange} className='border border-gray-600 p-1 rounded w-full text-gray-600 focus:outline-none bg-transparent' />
                        </div>
                    </div>
                    <div className='flex sm:flex-row flex-col sm:gap-5 gap-2 w-full'>
                        <div className='flex flex-col items-start sm:w-1/2 w-full'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email' required value={form.email} onChange={handleInputChange} className='border border-gray-600 p-1 rounded w-full text-gray-600 focus:outline-none bg-transparent' />
                        </div>
                        <div className='flex flex-col items-start sm:w-1/2 w-full'>
                            <label htmlFor="product">Product</label>
                            <select name="product" id="product" required value={form.product} onChange={handleInputChange} className='border border-gray-600 p-1 rounded w-full text-gray-600 focus:outline-none bg-transparent text-[13px]'>
                                <option value="" disabled>Select product</option>
                                {Object.values(groupedData).map((dataItem, index) => (
                                    <option value={dataItem.category.toLowerCase()} key={index}>{dataItem.category}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="message">Message</label>
                        <textarea type="text" id='message' name='message' rows="5" value={form.message} onChange={handleInputChange} className='border border-gray-600 p-1 rounded w-full text-gray-600 focus:outline-none bg-transparent' />
                    </div>
                    <input type="submit" value="SUBMIT" className='font-medium text-white bg-black px-3 py-2 rounded cursor-pointer' />
                </form>
            </div>
        </section>
    )
}

export default OrderForm;
