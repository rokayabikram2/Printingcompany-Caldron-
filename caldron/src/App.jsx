import React, { useEffect,  } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutUs from './pages/about/AboutUs';
import ContactUs from './pages/contact/ContactUs';
import ImageGallery from './pages/gallery/ImageGallery';
import VideoGallery from './pages/gallery/VideoGallery';
import HomePage from './pages/home/HomePage';
import MvvDetail from './pages/home/MvvDetail';
import Images from './pages/gallery/Images';
import SubCategory from './pages/products/SubCategory';
import ProductDetail from './pages/products/ProductDetail';
import Products from './pages/products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import WwaDetail from './pages/about/WwaDetail';
import WhyUsDetail from './pages/home/WhyUsDetail';
import CompanyDetail from './pages/home/CompanyDetail';
import ChatButton from './components/ChatButton';
const BaseUrlContext = React.createContext();




function App() {

  const scheme = window.location.protocol;
  const host = window.location.host;

  // Construct the base URL for the API
  // const baseUrl = `${scheme}//${host}/api`;

  const baseUrl = `http://127.0.0.1:8000/api`

  return (
    <> 
      <BaseUrlContext.Provider value={baseUrl}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/WhyUs/:title' element={<WhyUsDetail />} />
          <Route exact path='/CompanyData/:title' element={<CompanyDetail />} />
          <Route exact path='/AboutUs' element={<AboutUs />} />
          <Route exact path='/AboutUs/:title' element={<WwaDetail />} />
          <Route exact path='/ImageGallery' element={<ImageGallery />} />
          <Route exact path='/ImageGallery/:title' element={<Images />} />
          <Route exact path='/VideoGallery' element={<VideoGallery />} />
          <Route exact path='/ContactUs' element={<ContactUs />} />
          <Route exact path='/ProductCat/:category' element={<SubCategory />} />
          <Route exact path='/ProductCat/:category/:subCategory' element={<Products />} />
          <Route exact path='/ProductCat/:category/:subCategory/:product' element={<ProductDetail />} />
          <Route exact path='/Mvv/:title' element={<MvvDetail />} />
        </Routes>
        <ScrollToTop />
        <ChatButton />
        <Footer />
      </Router>
      </BaseUrlContext.Provider>
    </>
  )
}

// export default App
export { App as default, BaseUrlContext };

