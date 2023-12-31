import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseUrlContext } from '../App';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeBlock, setActiveBlock] = useState(0);
    const [galleryMenu, setGalleryMenu] = useState(false);
    const [categoryMenus, setCategoryMenus] = useState({});
    const [subcategoryMenus, setSubcategoryMenus] = useState({});
    const [nav, setNav] = useState(false);

    const [data, setData] = useState([])

    // nav dynamic
    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);
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

    const headerData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/globals/`);
            // Handle the response data here
            response.data && setData(response.data[0]);

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


        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        // Axios GET request to fetch data
        headerData();
        FetchProduct();

    }, [parentId]);
  

    //for navigation
    const handleNav = (navState) => {
        setNav(navState)
        if (navState) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }
    const location = useLocation();
    useEffect(() => {
        const determineActiveBlock = () => {
            const path = location.pathname;
            if (path === "/" || path.startsWith("/Mvv/") || path.startsWith("/CompanyData/") || path.startsWith("/WhyUs/")) {
                return 0;
            }
            else if (path.startsWith("/ProductCat")) {
                return 1;
            }
            else if (path === "/AboutUs" || path.startsWith("/AboutUs/")) {
                return 2;
            }
            else if (path.startsWith("/ImageGallery") || path === "/VideoGallery") {
                return 3;
            }
            else if (path === "/ContactUs") {
                return 4;
            }
        };

        setActiveBlock(determineActiveBlock());
    }, [location.pathname]);

    const handleButtonClick = (index) => {
        setActiveBlock(index)
    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setScrolled(scrollTop > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // for products menu
    const handleCategoryHover = (category, shouldShow) => {
        setCategoryMenus(prevMenus => ({
            ...prevMenus,
            [category]: shouldShow,
        }));
    };

    const handleSubcategoryHover = (subcategory, shouldShow) => {
        setSubcategoryMenus(prevMenus => ({
            ...prevMenus,
            [subcategory]: shouldShow,
        }));
    };

    const groupedData = {};

    productData.forEach((dataItem) => {
        if (!groupedData[dataItem.category]) {
            groupedData[dataItem.category] = {
                category: dataItem.category,
                thumbnailImage: dataItem.productimage,
                subcategories: {},
            };
        }
        // Group by subcategory within the category
        const categoryGroup = groupedData[dataItem.category];
        if (!categoryGroup.subcategories[dataItem.sub_category]) {
            categoryGroup.subcategories[dataItem.sub_category] = {
                subCategory: dataItem.sub_category,
                thumbnailImage: dataItem.productimage,
                products: [dataItem],
            };
        } else {
            categoryGroup.subcategories[dataItem.sub_category].products.push(dataItem);
        }
    });


    return (
        <header className={`py-2 bg-white sticky top-0 z-50 ${scrolled ? 'shadow-[0_0_10px_2px_rgba(0,0,0,0.2)]' : ''}`}>
            <div className='container flex justify-between items-center'>
                <NavLink to="/">
                    <img className='sm:w-[200px] w-[150px]' src={data && data.logo} alt="logo" />
                </NavLink>
                <div className='lg:hidden block sm:text-2xl text-xl' onClick={() => handleNav(true)} >
                    <i className="fa-solid fa-bars"></i>
                </div>
                <nav className={`lg:static absolute lg:overflow-visible overflow-y-scroll top-0 right-0 lg:w-auto lg:h-auto h-screen lg:bg-transparent bg-black lg:text-color1 text-white ${nav ? 'w-[270px]' : 'w-0'} lg:transition-none transition-all duration-300 ease-linear`}>
                    <ul className={`lg:flex-row flex-col lg:items-center items-end lg:gap-6 gap-4 font-semibold lg:flex lg:p-0 p-8 ${nav ? 'flex' : 'hidden'}`}>
                        <div className='lg:hidden block sm:text-2xl text-xl mb-2' onClick={() => handleNav(false)} >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <li onClick={() => handleButtonClick(0)}
                            className={`${activeBlock === 0 ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2'} relative lg:w-auto w-full lg:after:absolute after:content-[''] after:bottom-0 after:h-[2px] after:bg-color2 after:transition-all after:duration-200 after:ease-linear hover:after:w-full hover:after:left-0`}>
                            <NavLink onClick={() => handleNav(false)} to="/" className="inline-block w-full">Home</NavLink>
                        </li>
                        {navigation.map((nav) =>(
                            <React.Fragment key={nav.id}>
                                {nav.id ===76 &&(
                                     <li onClick={() => handleButtonClick(1)}
                                     onMouseEnter={() => { if (window.innerWidth > 1024) { handleCategoryHover('Products', true) } }}
                                     onMouseLeave={() => { if (window.innerWidth > 1024) { handleCategoryHover('Products', false) } }}
                                     className={`${activeBlock === 1 ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2'} relative lg:py-3 lg:w-auto w-full lg:after:absolute after:content-[''] after:bottom-[12px] after:h-[2px] after:bg-color2 after:transition-all after:duration-200 after:ease-linear hover:after:w-full hover:after:left-0`}>
                                     <button onClick={() => { handleCategoryHover('Products', categoryMenus['Products'] ? false : true), setGalleryMenu(false) }} className='w-full h-full flex justify-between items-center relative'>
                                         Products
                                         <i className={`fa-solid fa-chevron-down before:lg:hidden ${categoryMenus['Products'] ? 'rotate-180' : ''} transition-all duration-200 ease-linear`}></i>
                                     </button>
                                     <div className={`lg:bg-white lg:text-black text-gray-400 ${categoryMenus['Products'] ? 'block' : 'hidden'} lg:absolute lg:top-[48px] lg:left-[-140px] lg:border lg:mt-0 mt-2`}>
                                         <div className="flex flex-col lg:w-[160px] w-full h-full">
                                             {Object.values(groupedData).map((categoryItem, categoryIndex) => (
                                                 <div key={categoryIndex}>
                                                     <NavLink
                                                         className="p-2 lg:border-b lg:hover:text-color1 inline-block w-full relative"
                                                         to={`/ProductCat/${categoryItem.category}`}
                                                         onMouseEnter={() => { if (window.innerWidth > 1024) { handleCategoryHover(categoryItem.category, true) } }}
                                                         onMouseLeave={() => { if (window.innerWidth > 1024) { handleCategoryHover(categoryItem.category, false) } }}
                                                         onClick={() => { if (window.innerWidth > 1024) { setCategoryMenus({}) } }}
                                                     >
                                                         <button
                                                             onClick={() => handleCategoryHover(categoryItem.category, categoryMenus[categoryItem.category] ? false : true)}
                                                             className='relative w-full flex justify-between items-center'>
                                                             {categoryItem.category}
                                                             <span className='w-[20px] h-[20px] border flex justify-center items-center rounded-full lg:hidden'>
                                                                 <i className={`fa-solid fa-plus lg:before:hidden text-xs ${categoryMenus[categoryItem.category] ? 'before:hidden' : 'before:block'}`}></i>
                                                                 <i className={`fa-solid fa-minus lg:before:hidden text-xs ${categoryMenus[categoryItem.category] ? 'before:block' : 'before:hidden'}`}></i>
                                                             </span>
                                                         </button>
                                                         {Object.values(categoryItem.subcategories).length > 0 && (
                                                             <div className={`lg:bg-white bg-black lg:text-black text-gray-500 ${categoryMenus[categoryItem.category] ? 'block' : 'hidden'} lg:absolute lg:top-[10px] lg:left-[160px] lg:border lg:mt-0 mt-2`}>
                                                                 <div className="flex flex-col lg:w-[160px] w-full h-full">
                                                                     {Object.values(categoryItem.subcategories).map((subCategoryItem, subCategoryIndex) => (
                                                                         <NavLink key={subCategoryIndex} className="p-2 lg:border-b lg:hover:text-color1 inline-block w-full relative text-sm" to={`/ProductCat/${categoryItem.category}/${subCategoryItem.subCategory}`}
                                                                             onMouseEnter={() => { if (window.innerWidth > 1024) { handleSubcategoryHover(subCategoryItem.subCategory, true) } }}
                                                                             onMouseLeave={() => { if (window.innerWidth > 1024) { handleSubcategoryHover(subCategoryItem.subCategory, false) } }}
                                                                         >
                                                                             <button
                                                                                 onClick={() => handleSubcategoryHover(subCategoryItem.subCategory, subcategoryMenus[subCategoryItem.subCategory] ? false : true)}
                                                                                 className='relative w-full flex justify-between items-center'>
                                                                                 {subCategoryItem.subCategory}
                                                                                 <i className={`fa-solid fa-arrow-down lg:before:hidden text-xs ${subcategoryMenus[subCategoryItem.subCategory] ? 'rotate-180' : ''} transition-all duration-200 ease-linear`}></i>
                                                                             </button>
                                                                             {subCategoryItem.products.length > 0 && (
                                                                                 <div className={`lg:bg-white lg:text-black text-gray-400 ${subcategoryMenus[subCategoryItem.subCategory] ? 'block' : 'hidden'} lg:absolute lg:top-[10px] lg:left-[160px] lg:border lg:mt-0 mt-2`}>
                                                                                     <div className="flex flex-col lg:w-[160px] w-full h-full">
                                                                                         {subCategoryItem.products.map((productItem, productIndex) => {
                                                                                             const encodePath = encodeURIComponent(productItem.name)
                                                                                             return (<NavLink onClick={() => { setCategoryMenus({}); setSubcategoryMenus({}); handleNav(false) }} key={productIndex} className="p-2 lg:border-b lg:hover:text-color1 inline-block w-full relative text-xs" to={`/ProductCat/${categoryItem.category}/${subCategoryItem.subCategory}/${encodePath}`}>
                                                                                                 {productItem.name}
                                                                                             </NavLink>
                                                                                             )
                                                                                         })}
                                                                                     </div>
                                                                                 </div>
                                                                             )}
                                                                         </NavLink>
                                                                     ))}
                                                                 </div>
                                                             </div>
                                                         )}
                                                     </NavLink>
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 </li>
                                )}
                            </React.Fragment>
                             
                        ))}

                       

                        {navigation.map((nav) =>(
                            <React.Fragment key={nav.id}>
                                {nav.id !==1 && (
                                   <React.Fragment>
                                    {nav.id ===46 &&(
                                        <li onClick={() => handleButtonClick(2)}
                                            className={`${activeBlock === 2 ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2'} relative lg:w-auto w-full lg:after:absolute after:content-[''] after:bottom-0 after:h-[2px] after:bg-color2 after:transition-all after:duration-200 after:ease-linear hover:after:w-full hover:after:left-0`}>
                                            <NavLink onClick={() => handleNav(false)} to="/AboutUs" className="inline-block w-full">{nav.name}</NavLink>
                                        </li>
                                        
                                    )}

                                   </React.Fragment> 
                                )}
                            </React.Fragment>
                        ))}
                        
                        {navigation.map((nav) =>(
                            <React.Fragment key={nav.id}>
                                    {nav.id ===54 &&(
                                          <li onClick={() => handleButtonClick(3)}
                                          onMouseEnter={() => { if (window.innerWidth > 1024) { setGalleryMenu(true) } }}
                                          onMouseLeave={() => { if (window.innerWidth > 1024) { setGalleryMenu(false) } }}
                                          className={`${activeBlock === 3 ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2'} lg:py-3 relative lg:w-auto w-full lg:after:absolute after:content-[''] after:bottom-[12px] after:h-[2px] after:bg-color2 after:transition-all after:duration-200 after:ease-linear hover:after:w-full hover:after:left-0`} >
                                          <button onClick={() => { setGalleryMenu(!galleryMenu), setCategoryMenus({}) }} className="w-full h-full flex justify-between items-center relative">{nav.name}<i className={`fa-solid fa-chevron-down before:lg:hidden ${galleryMenu ? 'rotate-180' : ''} transition-all duration-200 ease-linear`}></i></button>
                                          {galleryMenu &&
                                              <div className={`lg:bg-white lg:text-black text-gray-300 ${galleryMenu ? 'block' : 'hidden'} lg:absolute lg:top-[48px] lg:left-[-20px] lg:border lg:mt-0 mt-2`}>
                                                  <div className="flex flex-col lg:w-[160px] w-full h-full">
                                                  {navigation[navigation?.findIndex(item => item?.id === 55)] && (
                                                      <NavLink onClick={() => { setGalleryMenu(false); handleNav(false) }} className="p-2 lg:border-b md:hover:text-color1 inline-block w-full" to="/ImageGallery">{navigation[navigation?.findIndex(item => item?.id === 55)]?.name}</NavLink>


                                                  )}
                                                  {navigation[navigation?.findIndex(item => item?.id === 65)] && (
                                                      <NavLink onClick={() => { setGalleryMenu(false); handleNav(false) }} className="p-2 lg:border-b md:hover:text-color1 inline-block w-full" to="/VideoGallery">{navigation[navigation?.findIndex(item => item?.id === 65)]?.name}</NavLink>

                                                  )}


                                                  </div>
                                              </div>
                                          }
                                      </li>
                                    )}


                            </React.Fragment>
                        ))}

                      
                        {navigation[navigation?.findIndex(item => item?.id === 45)] && (
                            <li onClick={() => handleButtonClick(4)} className={`${activeBlock === 4 ? 'after:w-full after:left-0' : 'after:w-0 after:left-1/2'} relative lg:w-auto w-full lg:after:absolute after:content-[''] after:bottom-0 after:h-[2px] after:bg-color2 after:transition-all after:duration-200 after:ease-linear hover:after:w-full hover:after:left-0`}>
                                <NavLink onClick={() => handleNav(false)} to="/ContactUs" className="inline-block w-full">{navigation[navigation?.findIndex(item => item?.id === 45)]?.name}</NavLink>
                            </li>

                        )}

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;