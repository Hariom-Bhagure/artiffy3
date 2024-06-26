import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import aboutUs from '../../assets/images/aboutUs.jpg';
import './AboutusHeader.css';
import Header from '../pages/Header';
import StatsSection from './StatsSection';



function AboutUsHeader() {
  return (
    <>
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <img 
            src={aboutUs}
            alt="3D Model" 
            className="img-fluid Image" 
          />
        </Col>
        <Col md={6}>
          <h2 className='aboutus'>About Us</h2>
          <p className='welcome'>
            Welcome to our 3D Model Hub, where you can seamlessly upload, view, and interact with 3D models through augmented and virtual reality. Our platform empowers artists, designers, and enthusiasts to bring their 3D projects to life.
            
            Simply upload your 3D models, and instantly immerse yourself in a dynamic AR/VR environment to explore every detail. Whether you’re showcasing a product, designing a new space, or presenting a prototype, our user-friendly interface and cutting-edge technology provide an unparalleled experience. Start your journey into the future of visualization with us today.
          </p>
        </Col>
      </Row>
      <StatsSection />
      
    </Container>
    </>
  );
}

export default AboutUsHeader;
