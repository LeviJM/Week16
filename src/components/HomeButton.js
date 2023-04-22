import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <button onClick={handleClick}>
      Home
    </button>
  );
};

export default HomeButton;