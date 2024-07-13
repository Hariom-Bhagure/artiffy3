import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner, Dropdown ,Image } from 'react-bootstrap';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Upload.css'; // Import your CSS file
import UploadNewFile from './pages/UploadNewFile'; // Import UploadNewFile component
import btnlogo from '../assets/Logo/btnlogo.png'

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false); // State for showing modal

    const handleFileChange = (e) => {   
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (fileInfo) => {
        const updatedFiles = [...uploadedFiles, fileInfo];
        setUploadedFiles(updatedFiles);
        setShowModal(false); // Close modal after uploading
    };

    const isImage = (file) => file.resource_type === 'image';
    const is3DModel = (file) => file.format === 'glb';

    const Model = ({ url }) => {
        const { scene } = useGLTF(url);
        return <primitive object={scene} />;
    };

    const handleEdit = () => {
        // Implement edit functionality
        console.log('Edit clicked');
    };

    const handleDelete = () => {
        // Implement delete functionality
        console.log('Delete clicked');
    };

    const handleRemove = () => {
        // Implement remove functionality
        console.log('Remove clicked');
    };

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Col>
                        <Button variant="primary" className='uploadfile1' onClick={() => setShowModal(true)}>
                            Choose File
                        </Button>
                        {showModal && <UploadNewFile onFileUpload={handleFileUpload} closeModal={() => setShowModal(false)} />} {/* Pass closeModal function to close modal */}
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <Button variant="success" onClick={handleFileUpload} disabled={!selectedFile || loading} className='uploadfile'>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Uploading...
                                </>
                            ) : (
                                'Upload New File'
                            )}
                        </Button>
                    </Col>
                </Row>

                <Row>
                    {uploadedFiles.map((file, index) => (
                        <Col key={index} xs={12} md={4} lg={4} className="mb-4">
                            <div className="preview-container">
                                <div className="context-menu">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="transparent" id={`dropdown-${index}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                        </svg>
                                        </Dropdown.Toggle>
                                        <div className='innerbtn'>
                                        <Dropdown.Menu className='menuinner'>
                                            <Dropdown.Item onClick={handleEdit} className=' '>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={handleDelete} className=' mt-2'>Delete</Dropdown.Item>
                                            <Dropdown.Item onClick={handleRemove} className='mt-2'>Remove</Dropdown.Item>
                                        </Dropdown.Menu>
                                        </div>
                                    </Dropdown>
                                </div>
                                
                                {isImage(file)}
                                {is3DModel(file) && (
                                    <Canvas className="thumbnail">
                                        <ambientLight />
                                        <pointLight position={[10, 10, 10]} />
                                        <Model url={file.secure_url} />
                                        <OrbitControls />
                                    </Canvas>
                                )}
                                <div className="file-details">
                                    <h4>{file.title}</h4>
                                    <p>{file.description}</p>
                                </div>
                                <div className="ar-button">
                                    <Button variant="primary" className="ARbtn">
                                      <Image src={btnlogo} width={40} height={40} className='btnimg'/>
                                        View In AR
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Upload;
