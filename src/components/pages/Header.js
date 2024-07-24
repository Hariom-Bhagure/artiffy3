import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Modal, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import menu_logo from "../../assets/Logo/line_menu.png";
import Logo from "../../assets/Logo/logo.png";
import ContactUs from '../ContactUs';
import EditFile from './EditFile';
import './Header.css';
import Profile from './Profile'; // Import the Profile component



  


function Header2() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null); // State to hold user information
  const [existingData, setExistingData] = useState({ title: 'Sample Title', description: 'Sample Description' });
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      axios.get('http://localhost:4000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserInfo(response.data); // Assuming backend returns user info in response.data
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/Signup', { email, password })
      .then(result => {
        console.log(result);
        navigate('/home');
        setShowLoginModal(false);
        setShowSignupModal(false);
        setIsLoggedIn(true);
        localStorage.setItem('userToken', result.data.token); // Store token in localStorage
      })
      .catch(err => console.log(err));
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', { email, password })
    .then(result => {
      console.log(result)
      toast.error("wrong credentials"); 
      if (result.data ==="success"){
        navigate("/home");
      }
    })
  }


  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken'); // Remove token from localStorage
    setUserInfo(null); // Clear user info state
    navigate('/home');
  }

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split('@')[0].split('.');
    const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const handleFileEdit = (data) => {
    console.log('Edited data:', data);
    // Handle the edited file data
  };

  return (
    <>
              <ToastContainer />

      <div className="logo" onClick={handleShow}>
        <i className="fas fa-bars"></i>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="sidebarright">
        <Offcanvas.Header closeButton className='sidebarheader'>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Col>
          <Form>
              <Form.Group controlId="formSearch" className="search-group">
                <IoSearch className="search-icon" fontSize={24}/>
                <Form.Control type="text" placeholder="Search" className="search-input" />
              </Form.Group>
            </Form>
          </Col>
          <Nav className="flex-column">
            <Nav.Link href="#home">
            <RiHome2Line size={24} className='mb-1' /> Modals</Nav.Link>
            <Nav.Link href="#artify">
            <PiUploadSimpleBold size={24} className='mb-1' /> Uploads</Nav.Link>
            <Nav.Link href="#contact">
            <CgProfile  size={24} className='mb-1'/>  Profile</Nav.Link> 
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout}>
                <MdOutlineLogout size={24} className='mb-1' /> Log out</Nav.Link>
            )}
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
              <Link to="/home" className='navbtn'>Home</Link>
              <Link to="/about" className='navbtn'>About</Link>
              <Link to="/pricing" className='navbtn'>Pricing</Link>
              <Link className='navbtn' onClick={() => setShowModal(true)}>Contact us</Link>
              {showModal && <ContactUs closeModal={() => setShowModal(false)} />}
              <Link to="/service" className='navbtn'>Services</Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <>
                <div className="three-bar-menu">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      {userInfo ? (
                        <Image src={`https://ui-avatars.com/api/?name=${userInfo.name}&background=random`} width={50} height={50} roundedCircle className='Userpicture' />
                      ) : (
                        <Image src={`https://ui-avatars.com/api/?name=${email}&background=random`} width={50} height={50} roundedCircle className='Userpicture' />
                      )}
                    </Dropdown.Toggle>
                    <Image src={menu_logo} onClick={handleShow} width={50} height={50} className='mt-2' />
                    <Dropdown.Menu>
                      <Dropdown.Item href='/profile'>
                         Profile
                      </Dropdown.Item>
                       <Dropdown.Item href='/upload'>
                         Upload
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                         Logout
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
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className='customm-modal'>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-body'>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Image src={Logo} className='modal-logo' />
                </Row>
                <Row className='mt-5'><h4>Log In</h4></Row>

                <Row className='mt-5'>
                  <Col lg={6} className=''>
                    <Button variant="" className="w-100 googleBtn text-black">
                      <FaGoogle fontSize={24} color='black' className='mb-1 gglbtn' />Log in With Google
                    </Button>
                  </Col>
                  <Col lg={6} className=''>
                    <Button variant="" className="w-100 facebookBtn text-black">
                      <FaFacebook fontSize={24} color='black' className='mb-1 fbbtn' />Log in With Facebook
                    </Button>
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
                      <Form.Control type="email" placeholder="Email Id" name="email" className='placeholder' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col lg={12} className='mt-5'>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" className='placeholder' onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>

                <Row>
                  <Col lg={12} className='logincol'>
                    <Button variant="primary modal-login-btn" onClick={handleSignIn}>
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
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} className='customm-modal'>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>SIGN UP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-body'>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Image src={Logo} className='modal-logo' />
                </Row>
                <Row className='mt-5'><h4>SIGN UP</h4></Row>

                <Row className='mt-5'>
                  <Col lg={6} className=''>
                    <Button variant="" className="w-100 googleBtn text-black">
                      <FaGoogle fontSize={24} color='black' className='mb-1 gglbtn' />Sign up With Google
                    </Button>
                  </Col>
                  <Col lg={6} className=''>
                    <Button variant="" className="w-100 facebookBtn text-black">
                      <FaFacebook fontSize={24} color='black' className='mb-1 Pbbtn' />Sign up With Facebook
                    </Button>
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
                      <Form.Control type="email" placeholder="Email Id" name="email" className='placeholder' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col lg={12} className='mt-5'>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" className='placeholder' onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
                <Form.Group controlId="formBasicCheckbox" className="mt-3 text-start tc">
                  <Form.Check className="checkbx" type="checkbox" label="Creating an account means you’re ok with the terms and conditions" />
                </Form.Group>

                <Row>
                  <Col lg={12} className='logincol'>
                  <Button variant="primary modal-login-btn" type="submit">
                      Sign Up
                    </Button>
                  </Col>
                </Row>

              </Form>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      {/* Profile Section */}
      {isLoggedIn && (
        <Profile userInfo={userInfo} />
      )}

      {/* EditFile Component */}
      <EditFile
        existingData={existingData}
        handleFileEdit={handleFileEdit}
      />
    </>
  );
}

export default Header2;
