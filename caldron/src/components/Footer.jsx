import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../App';

const Footer = () => {
  const [footer, setFooter] = useState([]);
  const [parentId, setParentId] = useState(null);

  const [navigation, setNavigation] = useState([]);

  const baseUrl = React.useContext(BaseUrlContext);


  const footerData = async () => {

    try {
        const response = await axios.get(`${baseUrl}/globals/`);
        response.data && setFooter(response.data[0]);

        // Fetch navigation data based on parentId and page_type
        const navigationResponse = await axios.get(
            `${baseUrl}/navigations/`,
            {
                params: {
                    parent_id: parentId,      // Set the parentId as a parameter
                    page_type: "Group"        // Filter by page_type
                }
            }
        );
        if (navigationResponse.data) {
            const navigationData = navigationResponse.data.filter(
                (item) => item.status === "Publish"
            );

            setNavigation(navigationData);
        }

    } catch (error) {
        console.error("Error fetching data:", error);

    }
}

useEffect(() => {
    footerData();

}, [parentId]);


  return (
    <footer className='bg-gray-300 py-4'>
      <div className='container'>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mb-4'>
          <div className='flex flex-col items-start gap-4'>
            <img className='w-[220px]' src={footer.logo} alt="logo" />
            <div className='flex items-center gap-2'>
              <a href={footer.Sitefacebooklink} target='_blank' rel='noreferrer' className='flex justify-center items-center h-[30px] w-[30px] bg-black text-white rounded-full sm:text-lg text-base'>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href={footer.Siteinstagram} target='_blank' rel='noreferrer' className='flex justify-center items-center h-[30px] w-[30px] bg-black text-white rounded-full text-base'>
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href={footer.Sitelinkdinlink} target='_blank' rel='noreferrer' className='flex justify-center items-center h-[30px] w-[30px] bg-black text-white rounded-full text-base'>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href={footer.Sitetwitterlink} target='_blank' rel='noreferrer' className='flex justify-center items-center h-[30px] w-[30px] bg-black text-white rounded-full text-base'>
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href={footer.Siteyoutubelink} target='_blank' rel='noreferrer' className='flex justify-center items-center h-[30px] w-[30px] bg-black text-white rounded-full text-base'>
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h3 className="md:text-xl text-lg font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Quick Links</h3>
            <ul className='lg:text-base text-sm'>
              {navigation[navigation?.findIndex(item => item?.id === 46)] && (
              <li><NavLink to="/AboutUs" className="flex items-center gap-1 hover:gap-2 transition-all duration-200 ease-linear"><i className="fa-solid fa-arrow-right text-sm text-color2"></i>{navigation[navigation?.findIndex(item => item?.id === 46)]?.name}</NavLink></li>


              )}
              {navigation[navigation?.findIndex(item => item?.id === 54)] &&(
              <li><NavLink to="/ImageGallery" className="flex items-center gap-1 hover:gap-2 transition-all duration-200 ease-linear"><i className="fa-solid fa-arrow-right text-sm text-color2"></i>{navigation[navigation?.findIndex(item => item?.id === 54)]?.name}</NavLink></li>


              )}
              {navigation[navigation?.findIndex(item => item?.id === 45)] &&(
              <li><NavLink to="/ContactUs" className="flex items-center gap-1 hover:gap-2 transition-all duration-200 ease-linear"><i className="fa-solid fa-arrow-right text-sm text-color2"></i>{navigation[navigation?.findIndex(item => item?.id === 45)]?.name}</NavLink></li>


              )}


            </ul>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h3 className="md:text-xl text-lg font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Contact Us</h3>
            <div className='flex flex-col items-start gap-1 lg:text-base text-sm'>
              <a href='https://maps.app.goo.gl/P4HT3BgZRz9Um5R6A' target='_blank' rel='noreferrer' className='flex items-center gap-1 group'>
                <i className="fa-solid fa-location-dot text-sm text-color2"></i>
                <p className='group-hover:underline'>{footer.SiteAddress}</p>
                </a>
              <a href={`{tel:${footer.SiteContact}`} className='flex items-center gap-1 group'>
                <i className="fa-solid fa-phone text-sm text-color2"></i>
                <p className='group-hover:underline'>{footer.SiteContact}</p>
                </a>
              <a href={`mailto:${footer.SiteEmail}`} className='flex items-center gap-1 group'>
                <i className="fa-solid fa-envelope text-sm text-color2"></i>
                <p className='group-hover:underline'>{footer.SiteEmail}</p>
                </a>
            </div>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h3 className="md:text-xl text-lg font-semibold relative after:absolute after:w-full after:h-[3px] after:content-[''] after:bg-color1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded before:absolute before:h-[3px] before:w-[3px] before:content-[''] before:bg-white before:bottom-0 before:z-10 before:animate-slow-motion">Scan QR</h3>
            <img className='w-[110px]' src={footer.scanner} alt="qr-code" />
          </div>
        </div>
        <div className='border-t border-black pt-2'>
          <p className='lg:text-base sm:text-sm text-xs'>Copyright &copy; 2023 Caldron Graphics. All right reserved. Powered by <a href="https://radiantnepal.com/" target='_blank' rel='noreferrer' className='text-color2 underline font-medium'>Radiant Infotech Nepal</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
