import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ClickCounter from './ClickCounter';
import IncreaseButton from './IncreaseButton';
import CommunityButton from './CommunityButton';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage = ({ count, setCount }) => {
  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/clicks/1';
  const history = useHistory();

  const updateCounter = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: count + 1 }),
      });
  
      if (response.ok) {
        setCount(count + 1);
      }
    } catch (error) {
      console.error('Error updating counter:', error);
    }
  };

  const handleAddCommentClick = () => {
    history.push('/comment');
  };



  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <h1>Home Page</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <ClickCounter count={count} />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <IncreaseButton onUpdate={updateCounter} />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddCommentClick}>
            Add Comment
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <CommunityButton />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;