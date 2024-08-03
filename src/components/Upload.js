import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, Image, Modal } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Upload.css';
import UploadNewFile from './pages/UploadNewFile';
import btnlogo from '../assets/Logo/btnlogo.png';
import NewSidebar from './NewSidebar';
import { FiUpload } from "react-icons/fi";
import EditFile from './pages/EditFile';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for showing upload modal
    const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal
    const [fileData, setFileData] = useState({
        title: 'Sample Title',
        description: 'Sample Description'
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete confirmation modal
    const [fileToDelete, setFileToDelete] = useState(null); // State to keep track of the file to delete

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (fileInfo) => {
        const updatedFiles = [...uploadedFiles, fileInfo];
        setUploadedFiles(updatedFiles);
        setShowModal(false); // Close upload modal after uploading
    };

    const handleFileEdit = (data) => {
        console.log('Edited Data:', data);
        setShowEditModal(false); // Close edit modal after saving changes
    };

    const isImage = (file) => file.resource_type === 'image';
    const is3DModel = (file) => file.format === 'glb';

    const Model = ({ url }) => {
        const { scene } = useGLTF(url);
        return <primitive object={scene} />;
    };

    const handleEditClick = (file) => {
        setFileData(file); // Set the file data to be edited
        setShowEditModal(true); // Show the EditFile modal
    };

    const handleDeleteClick = (file) => {
        setFileToDelete(file); // Set the file to delete
        setShowDeleteModal(true); // Show the delete confirmation modal
    };

    const handleDeleteConfirm = () => {
        const updatedFiles = uploadedFiles.filter(file => file !== fileToDelete);
        setUploadedFiles(updatedFiles);
        setShowDeleteModal(false); // Close the delete confirmation modal
        setFileToDelete(null); // Clear the file to delete
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false); // Close the delete confirmation modal
        setFileToDelete(null); // Clear the file to delete
    };

    const handleRemove = () => {
        console.log('Remove clicked');
    };

    return (
        <>
            <div className="d-flex main-div-upload">
                <NewSidebar />
                <div className="main-content">
                    <Container className='uploadcontainer'>
                        <Row className="my-4">
                            <Col xs={12} md={8} lg={6}>
                                <Button variant="primary" className='uploadfile1' onClick={() => setShowModal(true)}>
                                    <FiUpload fontSize={24} className='uploadbtnmini' />
                                    Upload New File
                                </Button>
                                {showModal && (
                                    <UploadNewFile
                                        onFileUpload={handleFileUpload}
                                        closeModal={() => setShowModal(false)}
                                    />
                                )}
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <Button variant="" onClick={handleFileUpload} disabled={!selectedFile || loading} className='uploadfile'>
                                </Button>
                            </Col>
                        </Row>

                        <Row>
                            {uploadedFiles.map((file, index) => (
                                <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                                    <div className="preview-container">
                                        <div className="context-menu">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="transparent" id={`dropdown-${index}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                    </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className='menuinner'>
                                                    <Dropdown.Item onClick={() => handleEditClick(file)} className='editbtn'>
                                                        Edit
                                                    </Dropdown.Item>
                                                    {showEditModal && (
                                                        <EditFile
                                                            showModal={() => setShowEditModal(true)}
                                                            closeModal={() => setShowEditModal(false)}
                                                            onFileEdit={handleFileEdit}
                                                            existingData={fileData} // Ensure this is correctly set
                                                        />
                                                    )}
                                                    <Dropdown.Item onClick={() => handleDeleteClick(file)} className='mt-2 editbtn'>
                                                        Delete
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={handleRemove} className='mt-2 editbtn'>
                                                        Remove
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
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
                                                <Image src={btnlogo} width={40} height={40} className='btnimg' />
                                                View In AR
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
                <Modal.Body className='deletemodal'>
                    <h4 className='modaltitle'>Are you sure?</h4>
                    <p className='modalheading'>
                        Are you sure you want to delete this file? This action cannot be undone.
                    </p>
                    <div className='footer-buttons'>
                        <Button
                            variant='primary'
                            onClick={handleDeleteCancel}
                            className='footrbtncncl'
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='primary'
                            onClick={handleDeleteConfirm}
                            className='footorbtndlt'
                        >
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* EditFile Modal */}
            {showEditModal && (
                <EditFile
                    closeModal={() => setShowEditModal(false)}
                    onFileEdit={handleFileEdit}
                    existingData={fileData}
                />
            )}
        </>
    );
};

export default Upload;
