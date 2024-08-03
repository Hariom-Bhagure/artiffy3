import React, { useState } from 'react';
import { Modal, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { X } from 'lucide-react'; // Assuming you have imported X from lucide-react
import axios from 'axios';
import './ContactUs.css';
import { toast, ToastContainer } from 'react-toastify';

const ContactUs = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleContact = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/contactus', { name, email, phone })
      .then(result => {
        console.log(result);
        toast.success('Form submitted successfully!');
        // Optionally, clear form fields after submission
        setName('');
        setEmail('');
        setPhone('');
      })
      .catch(err => {
        console.error(err);
        toast.error('Form not submitted, please try again.');
      });
  };

  return (
    <>
      <ToastContainer />
      <Modal show={true} onHide={closeModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12}>
                <Form onSubmit={handleContact}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactUs;
