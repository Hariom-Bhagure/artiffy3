import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Services.css';
import WorkingTeam from '../assets/images/working-team-image.jpg'; // replace with your image path

const ComingSoon = () => {
  return (
    <div className="coming-soon-wrapper">
      <Container className="text-center">
        <Row className="align-items-center justify-content-center">
          <Col lg={6} md={8} sm={10}>
            <Image src={WorkingTeam} className="working-team-image" alt="Developer Team Working" fluid />
            <h1 className="title">We're Working on It</h1>
            <p className="subtitle">Our developer team is hard at work. Stay tuned for updates!</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComingSoon;
