import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, ProgressBar, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/Logo/Upload_logo.png';
import cancelpng from "../../assets/Logo/cancel.png";
import uploadpng from "../../assets/Logo/upload.png";
import './UploadNewFile.css';

const UploadNewFile = ({ closeModal, onFileUpload }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const xhrRef = useRef(null);

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
        setSelectedFile(file);
        setUploadProgress(0);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            toast.error("File not selected");
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);
        uploadFormData.append('upload_preset', 'fileupload');
        uploadFormData.append('title', formData.title);
        uploadFormData.append('description', formData.description);

        setLoading(true);
        setShowProgressModal(true);
        setIsPaused(false);

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                setUploadProgress(percentCompleted);
            }
        };

        xhr.open('POST', 'https://api.cloudinary.com/v1_1/damlm4dnd/image/upload', true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = () => {
            setLoading(false);
            setShowProgressModal(false);

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                onFileUpload(response, formData.title, formData.description);
                setShowSuccessModal(true);
                setSelectedFile(null);
                toast.success("File uploaded");
            } else {
                console.error('Error uploading file:', xhr.responseText);
                setShowErrorModal(true);
            }
        };

        xhr.onerror = () => {
            console.error('Upload failed.');
            setLoading(false);
            setShowProgressModal(false);
            setShowErrorModal(true);
        };

        xhr.send(uploadFormData);
    };

    const handlePauseUpload = () => {
        if (isPaused) {
            handleFileUpload();
        } else {
            if (xhrRef.current) {
                xhrRef.current.abort();
            }
        }
        setIsPaused(!isPaused);
    };

    const handleCancelUpload = () => {
        if (xhrRef.current) {
            xhrRef.current.abort();
        }
        setLoading(false);
        setShowProgressModal(false);
    };

    const handleCloseSuccessModal = () => setShowSuccessModal(false);
    const handleCloseErrorModal = () => setShowErrorModal(false);

    return (
        <>
            <ToastContainer />
            <Modal show={true} onHide={closeModal} centered className='custom-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Upload New File</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Main-sec'>
                    <Container>
                        <Row className='text-center mb-4'>
                            <Col xs={12}>
                                <h1 className='heading1'>Upload New File</h1>
                            </Col>
                        </Row>
                        <Row className='logo-form'>
                            <Col xs={12} md={6} className='imgholder d-flex'>
                                <Image className='Uploadimg' src={Logo} width={92} height={90} onClick={handleFileSelect} />
                                
                                
                            </Col>
                            <Row>
                                <Col><h5 className='heading5'>Select your file from device</h5></Col>
                                </Row>
                            <Col xs={12} md={6} className='input-container'>
                                <Form.Group controlId="formTitle" className='Form-title'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        className='inputone'
                                        type="text"
                                        name="title"
                                        placeholder='Add a Title'
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
                                        placeholder='Add a description'
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col xs={12}>
                                <Button className='uploadbtn1' onClick={handleFileUpload}>Upload</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            <Modal show={showProgressModal} onHide={handleCancelUpload} centered className='blur-background'>
                <div className='full-progressbar'>
                    <Modal.Body className='progressBar'>
                        {loading && (
                            <>
                                <div className="text-center mb-3"></div>
                                <div className='loading-bar'>
                                    <Row className='text-center'>
                                        <Col><h5>Uploading.....</h5></Col>
                                        <Col><h5>{uploadProgress}%</h5></Col>
                                    </Row>
                                    <ProgressBar
                                        now={uploadProgress}
                                        className='custom-progress-bar'
                                    />
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="light" onClick={handleCancelUpload} className='btncncl'>
                                        Cancel
                                    </Button>
                                    <Button variant="light" onClick={handlePauseUpload} className='btnpause'>
                                        {isPaused ? 'Resume' : 'Pause'}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                </div>
            </Modal>

            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
                <div className='uploadmodal'>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <Image src={uploadpng} width={100} height={100} />
                        <h4 className='Uploadheading'>Upload Successful</h4>
                        <p className='uploadingpara'>Your file was successfully uploaded!</p>
                    </Modal.Body>
                    <Modal.Footer className='modalfootor'>
                        <Button variant="primary" className='okbtn' onClick={handleCloseSuccessModal}>
                            OK
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
                <div className='uploadmodal'>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <Image src={cancelpng} width={100} height={100} />
                        <h4 className='Uploadheading'>Upload Unsuccessful</h4>
                        <p className='uploadingpara'>There was a problem uploading your file</p>
                    </Modal.Body>
                    <Modal.Footer className='modalfootor'>
                        <Button variant="primary" className='okbtn' onClick={handleCloseErrorModal}>
                            Try Again
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};

export default UploadNewFile;
