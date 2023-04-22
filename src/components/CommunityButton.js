import React from 'react';
import { Link } from 'react-router-dom';

const CommunityButton = () => {
  return (
    <Link to="/community">
      <button>Go to Community Page</button>
    </Link>
  );
};

export default CommunityButton;