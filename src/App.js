import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Header from './components/pages/Header';
import Upload from "./components/Upload"
import AboutUs from './components/pages/AboutUs';
import PricingPlan from './components/pages/PricingPlan';
import ContactUs from './components/ContactUs';
import Services from './components/Services';
import AboutUsHeader from './components/commonHeader/AboutUsHeader';
import PricingHeader from './components/commonHeader/PricingHeader';
import Profile from './components/Profile';


function App() {

  return (
    <>

    <Router>
      <Header />
    <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route  path = "/Signup" component = {Signup} />
      <Route  path = "/about" component = {AboutUsHeader} />
      <Route  path = "/pricing" component = {PricingHeader} />
      <Route  path = "/contactus" component = {ContactUs} />
      <Route  path = "/services" component = {Services} />
      <Route  path = "/upload" component = {Upload} />
      <Route  path = "/profile" component = {Profile} />
    </Switch>

    </Router>
    
    
    
    
    </>
    

    
  );
}

export default App;
