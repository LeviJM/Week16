import React, { useState, useEffect } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/image/1';

  const fetchImage = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setImage(data.url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const saveImage = async (url) => {
    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      saveImage(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="uploaded" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageUpload;