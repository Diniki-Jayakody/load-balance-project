import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const InsertVideo = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const token = localStorage.getItem('token'); 

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('file', videoFile);
    console.log('detail',name, title, videoFile )
    try {
      const response = await axios.post('http://3.110.132.203:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': `${token}` 
        }
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error uploading video:', error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    const getVideoName = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get('http://3.110.132.203:3000/user/get_video_name', {
          headers: {
            'token': `${token}`
          }
        });
        setName(response.data.data.video_name);
        console.log('name', response.data.data.video_name)
      } catch (error) {
        console.error('Error fetching videos:', error.response?.data?.message || error.message);
      }
    };
    
    getVideoName();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Insert Video</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="title">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the video title"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="videoFile">
              Upload Video
            </label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertVideo;

