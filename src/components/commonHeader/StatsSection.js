// src/StatsSection.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <Container className="stats-section py-5">
      <Row>
        <Col xs={12} sm={6} md={3} className="text-center mb-4">
          <h3>20,000+</h3>
          <p>Available Designs</p>
        </Col>
        <Col xs={12} sm={6} md={3} className="text-center mb-4">
          <h3>10 million</h3>
          <p>Community Members</p>
        </Col>
        <Col xs={12} sm={6} md={3} className="text-center mb-4">
          <h3>11</h3>
          <p>Software Partners</p>
        </Col>
        <Col xs={12} sm={6} md={3} className="text-center mb-4">
          <h3>200</h3>
          <p className='special'>Customers</p>
        </Col>
      </Row>
    </Container>
  );
};

export default StatsSection;
