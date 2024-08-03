import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import AboutUs from './pages/AboutUs'
import Footer from './pages/Footer'
import MainSection from './pages/mainSection'
import PricingPlan from './pages/PricingPlan'
import Header2 from './pages/Header'

const Home = () => {
  return (
    <div>
        <br/>
        <br/>
        <br />

        <br/>

        <MainSection />
        <AboutUs />
        <PricingPlan />
        <Footer />
        <ProgressBar />
        
    </div>
  )
}

export default Home