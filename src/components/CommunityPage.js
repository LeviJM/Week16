import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EditButton from './EditButton';
import Header from './Header';
import ImageUpload from './ImageUpload';
import HomeButton from './HomeButton'

const CommunityPage = () => {
  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/communityText';
  const [text, setText] = useState('');

  const fetchText = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setText(data[0].content);
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  const handleUpdate = async (newText) => {
    try {
      const response = await fetch(`${apiUrl}/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newText }),
      });

      if (response.ok) {
        setText(newText);
      }
    } catch (error) {
      console.error('Error updating text:', error);
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Community Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Header initialText="Welcome to the Community Page" />
        </Col>
      </Row>
      <Row>
        <Col>
          <ImageUpload />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <EditButton onUpdate={handleUpdate} />
        </Col>
      </Row>
      <Row>
        <Col>
          <HomeButton />
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityPage;