import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom';
import './App.css';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import Profile from './components/Profile';
import Services from './components/Services';
import Signup from './components/Signup';
import TransitionWrapper from './components/TransitionWrapper';
import Upload from "./components/Upload";
import AboutUsHeader from './components/commonHeader/AboutUsHeader';
import PricingHeader from './components/commonHeader/PricingHeader';
import UploadNewFile from './components/pages/UploadNewFile';
import Header2 from './components/pages/Header';






function App() {

  return (
    <>
    <Router>
    <Header2 />
    <TransitionWrapper>
    <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route  path = "/Signup" component = {Signup} />
      <Route  path = "/about" component = {AboutUsHeader} />
      <Route  path = "/pricing" component = {PricingHeader} />
      <Route  path = "/contactus" component = {ContactUs} />
      <Route  path = "/services" component = {Services} />
      <Route  path = "/upload" component = {Upload} />
      <Route  path = "/profile" component = {Profile} />
      <Route  path = "/uploadnewfile" component = {UploadNewFile} />
    </Switch>
    </TransitionWrapper>    
    </Router>
    
    
    
    
    </>
    

    
  );
}

export default App;
