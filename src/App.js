import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUsHeader from './components/commonHeader/AboutUsHeader';
import PricingHeader from './components/commonHeader/PricingHeader';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import Header2 from './components/pages/Header';
import Profile from './components/pages/Profile';
import UploadNewFile from './components/pages/UploadNewFile';
import Services from './components/Services';
import Signup from './components/Signup';
import TransitionWrapper from './components/TransitionWrapper';
import Upload from './components/Upload';
import Header from './components/pages/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <TransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUsHeader />} />
            <Route path="/pricing" element={<PricingHeader />} />
            <Route path="/services" element={<Services />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/uploadnewfile" element={<UploadNewFile />} />
          </Routes>
        </TransitionWrapper>
      </Router>
    </>
  );
}

export default App;
