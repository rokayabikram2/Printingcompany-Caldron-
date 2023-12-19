import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrlContext } from '../App';

const ChatButton = () => {
    const [openBox, setOpenBox] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const baseUrl = React.useContext(BaseUrlContext);


    const [chat, setChat]= useState([]);
    
    const chatData = async () =>{
        try{
            const response = await axios.get(`${baseUrl}/globals/`);
            response.data && setChat(response.data[0]);

        }catch (error) {

        }
    }
    useEffect(() => {
        chatData();
    
    }, []);

    useEffect(() => {
        
        // Set a 2-second (2000ms) delay before showing the chat button
        const timer = setTimeout(() => {
            setOpenChat(true);
        }, 5000);

        // Clear the timer to prevent a memory leak when the component unmounts
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <button onClick={() => setOpenBox(!openBox)} className={`${openChat ? 'opacity-100 bottom-9' : 'opacity-0 bottom-0'} transition-all duration-300 ease-linear inline-block fixed right-6 text-white z-[9999]`}>
                <img className='w-[40px] h-[40px]' src="/src/assets/images/whatsapp.webp" alt="whatsapp icon" />
            </button>
            <div className={`${openBox ? 'flex flex-col items-center gap-3' : 'hidden'} fixed p-3 rounded-lg z-[9999] bg-white bottom-20 right-6 shadow-[0_0_5px_1px_rgba(0,0,0,0.2)] transition-all duration-700 ease-linear`}>
                <span onClick={() => setOpenBox(false)} className='absolute bg-white w-[35px] h-[35px] flex justify-center items-center top-[-12px] right-[-12px] border rounded-full cursor-pointer'>
                    <i className="fa-solid fa-xmark text-gray-700"></i>
                </span>
                <div className='flex items-center gap-2'>
                    <img className='w-[40px] h-[20px]' src="/src/assets/images/logo.png" alt="logo" />
                    <h1 className='sm:text-lg font-semibold'>{chat.SiteName}</h1>
                </div>
                <div className='w-full mb-8  sm:text-base text-sm'>
                    <b className='font-medium'>Chat with us</b>
                    <p className='text-gray-700'>Hi, How can we help you?</p>
                </div>
                <a href={`https://wa.me/${chat.Whatsapp}`} target='_blank' className='bg-green-600 text-white flex justify-center w-full rounded-lg py-2 font-medium sm:text-base text-sm'>Chat Now</a>
                <span className='text-[12px] flex items-center gap-1'><i className="fa-brands fa-whatsapp"></i>Powered by whatsapp</span>
            </div>
        </>
    )
}

export default ChatButton;
