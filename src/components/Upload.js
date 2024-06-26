// src/FileUpload.js
import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Upload.css';
import Header from './pages/Header';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'fileupload'); 

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/damlm4dnd/image/upload', 
        formData
      );
      setUploadedFiles([...uploadedFiles, response.data]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const isImage = (file) => file.resource_type === 'image';
  const is3DModel = (file) => file.format === 'glb';

  const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  };

  return (
    <>
      <Container>
        <Row className="my-4">
          <Col>
            <Button variant="primary" onClick={() => document.getElementById('file-input').click()} className='uploadfile1'>
              Choose File
            </Button>
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
              {isImage(file) && <img src={file.secure_url} alt="uploaded" className="thumbnail" />}
              {is3DModel(file) && (
                <Canvas className="thumbnail">
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Model url={file.secure_url} />
                  <OrbitControls />
                </Canvas>
              )}
              <Button variant="primary" className="mt-2">
                View In AR
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FileUpload;
