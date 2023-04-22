import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/header/1';

  const fetchHeader = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Error fetching header:', error);
    }
  };

  const saveHeader = async () => {
    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
    } catch (error) {
      console.error('Error saving header:', error);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    saveHeader();
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <h2>{text}</h2>
      )}
      <button onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Header;