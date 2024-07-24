import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = ({ userInfo }) => {
  if (!userInfo) {
    return null; // Return null or loading indicator if userInfo is not available yet
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Profile Information</h3>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          {/* Add more fields as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
