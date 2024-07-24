import React from 'react';
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
import logo from "../../src/assets/Logo/logo.png";
import './Sidebar.css'; // Import your custom CSS
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Container fluid>
        <Row className="logo-section">
          {/* <Col className="text-center">
            <img src={logo} alt="Logo" className="sidebar-logo" />
          </Col> */}
        </Row>
        <Row className="search-section">
          <Col>
          <Form>
              <Form.Group controlId="formSearch" className="search-group">
                <IoSearch className="search-icon" fontSize={24}/>
                <Form.Control type="text" placeholder="Search" className="search-input" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="buttons-section">
          <Nav className="flex-column">
            <Nav.Link href="#project" className="sidebar-button">Project</Nav.Link>
            <Nav.Link href="#my-organisation" className="sidebar-button">My Organisation</Nav.Link>
            <Nav.Link href="#marketplace" className="sidebar-button">Marketplace</Nav.Link>
            <Nav.Link href="#resources" className="sidebar-button">Resources</Nav.Link>
            <Nav.Link href="#community" className="sidebar-button">Community</Nav.Link>
          </Nav>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
