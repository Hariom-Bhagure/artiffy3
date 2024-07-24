import React from 'react'
import './Signup.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Logo from '../assets/Logo/logo.png';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';



const Signup = () => {
  return (
    <div className='mt-5'>

<Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
      <Row className="w-100">
        <Col xs={12} md={{ span: 6, offset: 3 }} className="text-start">
          
          <Image src= {Logo} alt="Logo" width="100" height="100" className=" logo" />
          <h2 className="text-left signUp">Sign up</h2>
          <Row className="mb-3">
            <Col>
            
              <Button variant="outline-primary" className="w-100 googleButton text-black"> <FaGoogle  fontSize={24} color='black'/>Sign in With Google</Button>
            </Col>
            <Col>
              <Button variant="outline-primary" className="w-100 facebookButton text-black"><FaFacebook fontSize={24} color='black'/>Sign in With Facebook</Button>
            </Col>
          </Row>
          <div className="my-3 or">or</div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="text-start emailbox">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email ID" className='emailinnerBox'/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3 text-start passwordBox">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"  className='passwordinnerBox'/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="mt-3 text-start tc">
              <Form.Check className = "checkbx"type="checkbox" label="Creating an account means you’re ok with the terms and conditions"/>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4 signupBox">Sign Up</Button>
          </Form>
          <div className="mt-3 haveAccount">
            Already have an account? <a href="#signin">Sign in.</a>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Signup