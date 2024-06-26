// src/StatsSection.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StatsSection.css';
import "./StatsSection.css";

const StatsSection = () => {
  return (
    <Container className="stats-section">
      <Row >
        <Col className="text-center">
          <h3>20,000+</h3>
          <p>Available Designs</p>
        </Col>
        <Col className="text-center">
          <h3>10 million</h3>
          <p>Community Members</p>
        </Col>
        <Col className="text-center">
          <h3>11</h3>
          <p>Software Partners</p>
        </Col>
        <Col className="text-center">
          <h3>200</h3>
          <p>Customers</p>
        </Col>
      </Row>
    </Container>
    
  );
};

export default StatsSection;
