import React, { useState } from 'react';

const EditButton = ({ onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(newText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default EditButton;