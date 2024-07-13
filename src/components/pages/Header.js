import axios from 'axios';
import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Modal, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import menu_logo from "../../assets/Logo/line_menu.png";
import Logo from "../../assets/Logo/logo.png";
import ContactUs from '../ContactUs';
import './Header.css';



function Header2() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, token: null });

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      setAuth({ isAuthenticated: true, user: response.data.user, token: response.data.token });
      localStorage.setItem('token', response.data.token);
      setShowLoginModal(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      setAuth({ isAuthenticated: true, user: response.data.user, token: response.data.token });
      localStorage.setItem('token', response.data.token);
      setShowSignupModal(false);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('token');
  };

  return (
    <>
      <div className="logo" onClick={handleShow}>
        <i className="fas fa-bars"></i>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="mb-3">
            <Form.Control type="search" placeholder="Search" aria-label="Search" />
          </Form>
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

      <Navbar bg="" expand="lg" className='navGroup'>
        <Container className='hello'>
          <Navbar.Brand>
            <img src={Logo} alt="Logo" width="100" height="100" />
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
            {auth.isAuthenticated ? (
              <>
                <div className="three-bar-menu">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <Image src={auth.user.picture || 'default_picture_url'} width={50} height={50} className='Userpicture' />
                    </Dropdown.Toggle>
                    <Image src={menu_logo} onClick={handleShow} width={50} height={50} className='mt-2' />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#profile">{auth.user.email}</Dropdown.Item>
                      <Dropdown.Item href="#profile">
                        <i className="bi bi-person-circle"></i> Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="/upload">
                        <i className="bi bi-upload"></i> Upload
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline-primary" className='loginbtn' onClick={() => setShowLoginModal(true)}>Log In</Button>
                <Button variant="outline-primary active" className='signUpbtn' onClick={() => setShowSignupModal(true)}>Sign Up</Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

     {/* Login Modal */}
<Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className='custom-modal'>
  <Container>
    <Modal.Header closeButton>
      <Modal.Title>Log In</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='modal-body'>
        <Form onSubmit={(e) => {  
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleLogin(email, password);
        }}>
          <Row>
            <Image src={Logo} className='modal-logo'/>
          </Row>
          <Row className='mt-5'><h4>Log In</h4></Row>

          <Row className='mt-5'>
            <Col lg={6} className=''>
            <Button variant="" className="w-100 googleBtn text-black"> <FaGoogle  fontSize={20} color='black' className='mb-1 gglbtn'/>Log in With Google</Button>
            </Col>
            <Col lg ={6} className=''>
            <Button variant="" className="w-100 facebookBtn text-black"><FaFacebook fontSize={20} color='black'className='mb-1 fbbtn'/>Log in With Facebook</Button>
            </Col>
            <Row>
            <Col lg={4}></Col>
            <Col className='orcol ' lg={4} >or</Col>
            <Col lg={4}></Col>
            
            </Row>
          </Row>
          <Container className='container-form'>
          <Row className='mt-5'>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email Id" name="email"className='placeholder'/>
          </Form.Group>
          </Row>
          <Row>
            <Col lg={12} className='mt-5'>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" className='placeholder' />
          </Form.Group>
          </Col>
          </Row>
          </Container>
          
          <Row>
            <Col lg={12} className='logincol'>
          <Button variant="primary modal-login-btn" type="submit">
            Log In
          </Button>
          </Col>
          </Row>
          
        </Form>
      </div>
    </Modal.Body>
  </Container>
</Modal>

{/* Signup Modal */}

<Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} className='custom-modal'>
<Container>
    <Modal.Header closeButton>
      <Modal.Title>SIGN UP</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='modal-body'>
        <Form onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleLogin(email, password);
        }}>
          <Row>
            <Image src={Logo} className='modal-logo'/>
          </Row>
          <Row className='mt-5'><h4>SIGN UP</h4></Row>

          <Row className='mt-5'>
            <Col lg={6} className=''>
            <Button variant="" className="w-100 googleBtn text-black"> <FaGoogle  fontSize={24} color='black' className='mb-1 gglbtn'/>Sign up With Google</Button>
            </Col>
            <Col lg ={6} className=''>
            <Button variant="" className="w-100 facebookBtn text-black"><FaFacebook fontSize={24} color='black'className='mb-1 fbbtn'/>Sign up With Facebook</Button>
            </Col>
            <Row>
            <Col lg={4}></Col>
            <Col className='orcol ' lg={4} >or</Col>
            <Col lg={4}></Col>
            
            </Row>
          </Row>
          <Container className='container-form'>
          <Row className='mt-5'>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email Id" name="email"className='placeholder'/>
          </Form.Group>
          </Row>
          <Row>
            <Col lg={12} className='mt-5'>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" className='placeholder' />
          </Form.Group>
          </Col>
          </Row>
          </Container>
          <Form.Group controlId="formBasicCheckbox" className="mt-3 text-start tc">
              <Form.Check className = "checkbx"type="checkbox" label="Creating an account means you’re ok with the"/>
            </Form.Group>
          
          <Row>
            <Col lg={12} className='logincol'>
          <Button variant="primary modal-login-btn" type="submit">
            SIGN UP
          </Button>
          </Col>
          </Row>
          
        </Form>
      </div>
    </Modal.Body>
  </Container>
</Modal>
    </>
  );
}

export default Header2;
