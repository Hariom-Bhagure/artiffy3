import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Image, Offcanvas } from 'react-bootstrap';
import Logo from "../../assets/Logo/logo.png";
import './Header.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ContactUs from '../ContactUs';

function Header() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  function uploadHandler() {
    return <Link to='/upload'></Link>
  }

  return (
    <>
      <div className="logo" onClick={handleShow}>
        <i className="fas fa-bars"></i>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#home">
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link href="#artify">
              <i className="fas fa-paint-brush"></i> Artify
            </Nav.Link>
            <Nav.Link href="#contact">
              <i className="fas fa-phone"></i> Contact
            </Nav.Link>
            <Nav.Link href="#settings">
              <i className="fas fa-cog"></i> Settings
            </Nav.Link>
            <Nav.Link href="#logout">
              <i className="fas fa-sign-out-alt"></i> Log out
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Header Starts from Here */}
      <Navbar bg="" expand="lg" className='navGroup'>
        <Container className='hello'>
          <Navbar.Brand>
            <img src={Logo} alt="Logo" width="100" height="100" onClick={handleShow} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav1">
              <Link to="/" className='navbtn'>Home</Link>
              <Link to="/about" className='navbtn'>About</Link>
              <Link to="/pricing" className='navbtn'>Pricing</Link>
              <Link className='navbtn' onClick={() => setShowModal(true)}>Contact us</Link>
              {showModal && <ContactUs closeModal={closeModal} />}
              <Link to="/service" className='navbtn'>Services</Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {isAuthenticated && <Image src={user.picture} width={70} height={70} className='Userpicture' />}
            {isAuthenticated ? (
              <>
                <Dropdown alignRight>
                  <Dropdown.Toggle className='hamburger-toggle'>
                    <Image src={Logo} roundedCircle width="30" height="30" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">{user.name}</Dropdown.Item>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={uploadHandler}>Uploads</Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-primary " className='signUpbtn' onClick={() => logout()}>Log out</Button>
              </>
            ) : (
              <>
              <Button variant="outline-primary " className='loginbtn' onClick={() => loginWithRedirect()}>Log In</Button>

              <Button variant="outline-primary active " className='signUpbtn' onClick={() => logout()}>Sign Up</Button></>
              
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
