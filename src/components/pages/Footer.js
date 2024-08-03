import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "./Footer.css";
import Logo from "../../assets/Logo/footor_Logo.png";

function Footer() {
  return (
    <footer className="">
      <Container className='container-main container-fluid'>
        <Row>
          <Col xs={12} md={1} className='footerimage'>
            <img src={Logo} alt="Logo" width="100" height="100" />
          </Col>
          <Col xs={12} md={3} className='colm'>
            <h5 className='company'>Company</h5>
            <Nav className="flex-column subheading">
              <Nav.Link href="#about">About us</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#terms">Terms & Conditions</Nav.Link>
              <Nav.Link href="#privacy">Privacy Policy</Nav.Link>
              <Nav.Link href="#refund">Refund Policy</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h5 className='solutions'>Solutions</h5>
            <Nav className="flex-column subheading">
              <Nav.Link href="#product">Product</Nav.Link>
              <Nav.Link href="#brand">Brands & Businesses</Nav.Link>
              <Nav.Link href="#agencies">Agencies</Nav.Link>
              <Nav.Link href="#creators">Creators & Freelancers</Nav.Link>
              <Nav.Link href="#casestudies">Case Studies</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4}>
            <h5 className='community'>Community</h5>
            <Nav className="flex-column subheadingC">
              <Nav.Link href="#forum">Discussion Forum</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#careers">Careers</Nav.Link>
              <Nav.Link href="#contactus">Contact Us</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
