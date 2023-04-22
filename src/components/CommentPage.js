import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, FormControl, Button } from 'react-bootstrap';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';
import HomeButton from './HomeButton';
import CommunityButton from './CommunityButton';



const CommentPage = ({ clickCount }) => {
  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/comments';
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (comment, password) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: comment,
          password: password,
          clicks: clickCount,
          likes: 0,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId, password) => {
    const commentToDelete = comments.find((comment) => comment.id === commentId);
    if (commentToDelete.password === password) {
      try {
        const response = await fetch(`${apiUrl}/${commentId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setComments(comments.filter((comment) => comment.id !== commentId));
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    } else {
      alert('Incorrect password. Unable to delete comment.');
    }
  };

  const handleLike = async (commentId) => {
    const commentToLike = comments.find((comment) => comment.id === commentId);
    const updatedLikes = commentToLike.likes + 1;
    commentToLike.disabled = true;
    try {
      const response = await fetch(`${apiUrl}/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: updatedLikes, disabled: true }),
      });
  
      if (response.ok) {
        commentToLike.likes = updatedLikes;
        setComments([...comments]);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId) => {
    const commentToDislike = comments.find((comment) => comment.id === commentId);
    const updatedLikes = commentToDislike.likes - 1;
    commentToDislike.disabled = true;
    try {
      const response = await fetch(`${apiUrl}/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: updatedLikes, disabled: true }),
      });
  
      if (response.ok) {
        commentToDislike.likes = updatedLikes;
        setComments([...comments]);
      }
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Comment Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentForm onSubmit={handleCommentSubmit} />
          <HomeButton />
          <CommunityButton />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <ListGroup>
            {comments
              .sort((a, b) => b.likes - a.likes)
              .map((comment) => (
                <ListGroup.Item key={comment.id}>
                  {comment.text} (Clicks: {comment.clicks}) | Likes: {comment.likes}
                  <br />
                  <LikeButton
                    onLike={() => handleLike(comment.id)}
                    disabled={comment.disabled}
                  />
                  <DislikeButton
                    onDislike={() => handleDislike(comment.id)}
                    disabled={comment.disabled}
                  />
                  <br />
                  <FormControl
                    type="password"
                    placeholder="Enter password to delete"
                    onChange={(e) => (comment.deletePassword = e.target.value)}
                  />
                  <Button
                    className="mt-2"
                    variant="danger"
                    onClick={() => handleDeleteComment(comment.id, comment.deletePassword)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentPage;