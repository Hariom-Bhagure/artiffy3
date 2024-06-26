import React from 'react'
import Header from './pages/Header'
import AboutUs from './pages/AboutUs'
import MainSection from './pages/mainSection'
import PricingPlan from './pages/PricingPlan'
import Footer from './pages/Footer'

const Home = () => {
  return (
    <div>
        <br/>
       
        <MainSection /><br/>
        <AboutUs /> <br/>
        <PricingPlan />
        <Footer />
        
    </div>
  )
}

export default Home