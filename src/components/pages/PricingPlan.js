import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "./PricinggPlan.css"

function PricingPlan() {
  return (
    <Container className="my-5 text-center">
      <h2>Choose your plan</h2>
      <p className='para1'>14 days unlimited free trial. No Contract or credit card required.</p>
      <Row className="mt-4">
        <Col xs={12} md={4} className="mb-4">
          <Card className='card1'>
            <Card.Body>
              <Card.Title className='Title'>Free</Card.Title>
              <Card.Text className='subtext' >$0 per month<br />For beginners</Card.Text>
              <Button className=" getbtn" variant="primary" href="#free">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <Card className='card2'>
            <Card.Body>
              <Card.Title className='Title1'>Pro</Card.Title>
              <Card.Text className='subtext1'>$99 per month<br />For intermediate</Card.Text>
              <Button className=" getbtn2"  href="#pro">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <Card className='card3'>
            <Card.Body >
              <Card.Title className='Title'>Advanced</Card.Title>
              <Card.Text className='subtext' >$199 per month<br />For advanced</Card.Text>
              <Button className=" getbtn"  href="#advanced">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PricingPlan;
