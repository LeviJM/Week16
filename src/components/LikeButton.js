import React from 'react';

const LikeButton = ({ onLike, disabled }) => {
    return (
      <button onClick={onLike} disabled={disabled}>
        Like
      </button>
    );
  };
  
  export default LikeButton;