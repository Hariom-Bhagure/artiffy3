import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import Logo from '../../assets/Logo/Upload_logo.png';
import './UploadNewFile.css';

const EditFile = ({ onFileEdit, existingData = {}, showModal, closeModal }) => {
    const [formData, setFormData] = useState({
        title: existingData.title || '',
        description: existingData.description || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => handleFileChange(e.target.files[0]);
        input.click();
    };

    const handleFileChange = (file) => {
        onFileEdit({ ...formData, file });
    };

    const handleSave = () => {
        onFileEdit(formData);
    };

    return (
        <>
            <div className='page-wrapper1'></div>
            <Modal show={showModal} onHide={closeModal} centered className='custom-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your File</Modal.Title>
                </Modal.Header>
                <div className='Main-sec'>
                    <Modal.Body className='Main-sec'>
                        <Container>
                            <Row>
                                <Col lg={4}></Col>
                                <Col lg={4}>
                                    <h1 className='heading1'>Edit Your File</h1>
                                </Col>
                                <Col lg={4}></Col>
                            </Row>
                            <Row className='logo-form'>
                                <Col lg={1}></Col>
                                <Col lg={4} className='imgholder'>
                                    <Image className='Uploadimg' src={Logo} width={92} height={90} onClick={handleFileSelect} />
                                    <h5 className='heading5'>Select files from your device</h5>
                                </Col>
                                <Col lg={1}></Col>
                                <Col lg={2}>
                                    <Row>
                                        <Form.Group controlId="formTitle" className='Form-title'>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                className='inputone'
                                                type="text"
                                                name="title"
                                                placeholder='Add title'
                                                value={formData.title}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                className='inputTwo'
                                                type="text"
                                                name="description"
                                                placeholder='Add description'
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col lg={2}></Col>
                            </Row>
                            <Row>
                                <Col lg={4}></Col>
                                <Col lg={2} className='mt-2'>
                                    <Button className='uploadbtn1' variant="secondary" onClick={closeModal}>Cancel</Button>
                                </Col>
                                <Col lg={2} className='mt-2'>
                                    <Button className='uploadbtn1' onClick={handleSave}>Save</Button>
                                </Col>
                                <Col lg={4}></Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default EditFile;
