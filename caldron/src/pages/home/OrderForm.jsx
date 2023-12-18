import React, { useState } from 'react'
import ProductData from '../../data/ProductData';

const OrderForm = () => {
    const groupedData = {};

    ProductData.forEach((dataItem) => {
        if (!groupedData[dataItem.category]) {
            groupedData[dataItem.category] = {
                category: dataItem.category,
                thumbnailImage: dataItem.imageUrl,
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
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted successfully!')
        console.log(form)
        setForm(initialForm)
    }
    return (
        <section className="md:py-20 py-16 relative bg-cover bg-fixed bg-no-repeat bg-[url('/src/assets/images/img1.webp')]">
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
