import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import BASE_URL from '../config'; 

const InsertVideo = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null); // Change to file instead of videoFile
  const token = localStorage.getItem('token'); 
  const [responseTime, setResponseTime] = useState(null); // Final time taken
  const [timer, setTimer] = useState(0); // Time passed in seconds
  const [isUploading, setIsUploading] = useState(false); // Flag for upload in progress

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the file (any type)
  };

  // Timer effect during upload
  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Clear the timer when done
  }, [isUploading]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const startTime = Date.now();
    setIsUploading(true); // Set uploading flag
    setTimer(0); // Reset timer

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('file', file); // Append file (can be any type)

    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': `${token}` 
        }
      });
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      setResponseTime(timeTaken);
      setIsUploading(false); // Stop upload flag

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.message || error.message);
      setIsUploading(false); // Stop the upload flag on error
    }
  };

  // Fetch video name
  useEffect(() => {
    const getFileName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/get_file_name`, {
          headers: {
            'token': `${token}`
          }
        });
        setName(response.data.data.file_name);
      } catch (error) {
        console.error('Error fetching file name:', error.response?.data?.message || error.message);
      }
    };
    
    getFileName();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Insert File</h2>

        {isUploading ? (
          <p style={{color: 'red', padding: '3px'}}>Time passed: {timer} seconds</p>
        ) : responseTime && (
          <p style={{color: 'red', padding: '3px'}}>Total time taken for uploading: {responseTime} seconds</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="title">
              File Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the file title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="file">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange} // No accept attribute to allow any file type
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertVideo;
