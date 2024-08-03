import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Modal, Nav, Navbar, Offcanvas } from 'react-bootstrap';
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

  // Fetch user info on component mount if a token is present
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log('Token after refresh:', token);

    if (token) {
      setIsLoggedIn(true);
      axios.get('http://localhost:4000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserInfo(response.data); // Set user info
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        // Handle invalid token scenario
        setIsLoggedIn(false);
        localStorage.removeItem('userToken');
      });
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const handleSignup = (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      axios.post('http://localhost:4000/signup', { email, password })
        .then(result => {
          const { token } = result.data;
          if (token) {
            localStorage.setItem('userToken', token); // Store token in localStorage
            console.log(token)
            setShowLoginModal(false);
            setShowSignupModal(false);
            setIsLoggedIn(true);
            navigate('/');
            toast.success('Signup successful!');
          } else {
            toast.error('Signup failed. No token received.');
          }
        })
        .catch(err => {
          console.log(err);
          toast.error('Signup failed. Please try again.');
        });
    }
    
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    axios.post('http://localhost:4000/login', { email, password })
      .then(result => {
        const { token } = result.data;
        if (token) {
          localStorage.setItem('userToken', token); // Store token in localStorage
          setShowLoginModal(false);
          setIsLoggedIn(true);
          navigate("/");
          toast.success('Login successful!');
        } else {
          toast.error('Login failed. No token received.');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Login failed. Please try again.');
      });
  }
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken'); // Remove token from localStorage
    setUserInfo(null); // Clear user info state
    navigate('/');
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
      <Navbar bg="" expand="lg" className='navGroup'>
        <Container>
          <Navbar.Brand>
            <img src={Logo} alt="Logo" width="100" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className='navbtn'>Home</Link>
              <Link to="/about" className='navbtn'>About</Link>
              <Link to="/pricing" className='navbtn'>Pricing</Link>
              <Link className='navbtn' onClick={() => setShowModal(true)}>Contact us</Link>
              {showModal && <ContactUs closeModal={() => setShowModal(false)} contactId="specific-contact-id"/>}
              <Link to="/services" className='navbtn'>Services</Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <Image src={`https://ui-avatars.com/api/?name=${userInfo ? userInfo.name : email}&background=random`} width={50} height={50} roundedCircle className='userimage' />
                    <Image src={menu_logo} width={40} className='menubtn' onClick={handleShow}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Item href='/upload'>Upload</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              ) : (
                <>
                  <Button variant="outline-primary" className='loginbtn' onClick={() => setShowLoginModal(true)}>Log In</Button>
                  <Button variant="outline-primary active" className='signUpbtn' onClick={() => setShowSignupModal(true)}>Sign Up</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="sidebarright">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Col>
            <Form>
              <Form.Group controlId="formSearch" className="search-group">
                <IoSearch className="search-icon" fontSize={24} />
                <Form.Control type="text" placeholder="Search" className="search-input" />
              </Form.Group>
            </Form>
          </Col>
          <Nav className="flex-column">
            <Nav.Link href="#home"><RiHome2Line size={24} className='mb-1' /> Modals</Nav.Link>
            <Nav.Link href="#artify"><PiUploadSimpleBold size={24} className='mb-1' /> Uploads</Nav.Link>
            <Nav.Link href="#contact"><CgProfile size={24} className='mb-1' /> Profile</Nav.Link>
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout}><MdOutlineLogout size={24} className='mb-1' /> Log out</Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} className='customm-modal'>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Image src={Logo} className='modal-logo'/>
              <Button variant="" className="w-100 googleBtn text-black mt-2"><FaGoogle fontSize={24} className='mb-1' /><pre> </pre>Log in With Google</Button>
              <Button variant="" className="w-100 facebookBtn text-black mt-3"><FaFacebook fontSize={24} className='mb-1' /><pre>   </pre>Log in With Facebook</Button>
              <div className='text-center mt-3'>or</div>
              <Form.Group controlId="formBasicEmail" className=''>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email Id" className='placeholder' onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className='placeholder' onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary modal-login-btn mt-3" onClick={handleSignIn}>Log In</Button>
            </Form>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} className='customm-modal'>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>SIGN UP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Image src={Logo} className='modal-logo' />
              <Button variant="" className="w-100 googleBtn text-black mt-2"><FaGoogle fontSize={24} className='mb-1' />Sign up With Google</Button>
              <Button variant="" className="w-100 facebookBtn text-black mt-3"><FaFacebook fontSize={24} className='mb-1' />Sign up With Facebook</Button>
              <div className='text-center mt-3'>or</div>
              <Form.Group controlId="formBasicEmail" className=''>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email Id" className='placeholder' onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className='placeholder' onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary modal-login-btn mt-3" onClick={handleSignup}>Sign Up</Button>
            </Form>
          </Modal.Body>
        </Container>
      </Modal>

      {showModal && (
        <EditFile
          data={existingData}
          onClose={() => setShowModal(false)}
          onSubmit={handleFileEdit}
        />
      )}
    </>
  );
}

export default Header2;
