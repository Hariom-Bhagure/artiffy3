import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import video from '../../assets/videos/Intro.gif';
import './Mainsection.css';

function MainSection() {
  return (
    <Container className="my-5 ">
      <Row className="align-items-center">
        <Col md={6} className="text-center mycontainer">
          <h1>Upload, Visualize, Experience</h1>
          <p>
            Effortlessly upload your 3D models and instantly visualize them in augmented reality. Experience a new dimension of interaction and immersion with our cutting-edge AR platform for 3D artists.
          </p>
          <Button  href="#get-started" className="getbtn1">Get Started</Button>
          {/* <Button variant="secondary" href="#upload">Upload</Button> */}
        </Col>
        <Col md={6} className="text-center">
          <img src={video} alt="AR Experience" className="img-fluid VideoIntro" />
        </Col>
      </Row>
    </Container>
  );
}

export default MainSection;



