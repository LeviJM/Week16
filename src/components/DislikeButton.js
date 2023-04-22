import React from 'react';

const DislikeButton = ({ onDislike, disabled }) => {
    return (
      <button onClick={onDislike} disabled={disabled}>
        Dislike
      </button>
    );
  };
  
  export default DislikeButton;