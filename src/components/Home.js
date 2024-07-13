import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import AboutUs from './pages/AboutUs'
import Footer from './pages/Footer'
import MainSection from './pages/mainSection'
import PricingPlan from './pages/PricingPlan'

const Home = () => {
  return (
    <div>
        <br/>
       
        <MainSection /><br/>
        <AboutUs /> <br/>
        <PricingPlan />
        <Footer />
        <ProgressBar />
        
    </div>
  )
}

export default Home