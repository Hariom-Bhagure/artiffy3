import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "./Footer.css";
import Logo from "../../assets/Logo/footer_Logo.png";

function Footer() {
  return (
    <footer>
      <Container>
        <div className="footer-content">
          <div className="link-columns">
          <img src={Logo} alt="Logo" className="logo" />
            <div className="column">
              <h5 className="font-weight-bold">Company</h5>
              <Nav className="flex-column">
                <Nav.Link href="#about" className="text-white">About us</Nav.Link>
                <Nav.Link href="#pricing" className="text-white">Pricing</Nav.Link>
                <Nav.Link href="#terms" className="text-white">Terms&Conditions</Nav.Link>
                <Nav.Link href="#privacy" className="text-white">Privacy Policy</Nav.Link>
                <Nav.Link href="#refund" className="text-white">Refund Policy</Nav.Link>
              </Nav>
            </div>
            <div className="column">
              <h5 className="font-weight-bold">Solutions</h5>
              <Nav className="flex-column">
                <Nav.Link href="#product" className="text-white">Product</Nav.Link>
                <Nav.Link href="#brand" className="text-white">Brands&Businesses</Nav.Link>
                <Nav.Link href="#agencies" className="text-white">Agencies</Nav.Link>
                <Nav.Link href="#creators" className="text-white">Creators&Freelancers</Nav.Link>
                <Nav.Link href="#casestudies" className="text-white">Case Studies</Nav.Link>
              </Nav>
            </div>
            <div className="column">
              <h5 className="font-weight-bold">Community</h5>
              <Nav className="flex-column">
                <Nav.Link href="#forum" className="text-white">DiscussionForum</Nav.Link>
                <Nav.Link href="#blog" className="text-white">Blog</Nav.Link>
                <Nav.Link href="#careers" className="text-white">Careers</Nav.Link>
                <Nav.Link href="#contactus" className="text-white">Contact Us</Nav.Link>
              </Nav>
            </div>
          </div>
         
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
