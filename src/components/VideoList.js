import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import BASE_URL from '../config';

const ViewVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null); // Store the converted video URL
  const [selectedTypes, setSelectedTypes] = useState({});
  const [conversionTime, setConversionTime] = useState(null); // Final conversion time
  const [timer, setTimer] = useState(0); // Time passed in seconds
  const [isConverting, setIsConverting] = useState(false); // Flag to check if conversion is in progress

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get(`${BASE_URL}/user/get_videos`, {
          headers: {
            'token': `${token}`,
          },
        });
        const videosArray = response.data.data?.data_ || [];
        if (Array.isArray(videosArray)) {
          setVideos(videosArray); // Set the videos array in state
        } else {
          console.error('Expected an array, but got:', videosArray);
        }
      } catch (error) {
        console.error('Error fetching videos:', error.response?.data?.message || error.message);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let interval;
    if (isConverting) {
      // Start timer when conversion is in progress
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval); // Clear interval when conversion stops
  }, [isConverting]);

  const convertVideo = async (video_id) => {
    try {
      setIsConverting(true); // Start conversion
      setTimer(0); // Reset timer
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const type = selectedTypes[video_id] || 'mp4'; 
      setConversionTime(null)
      setVideoUrl(null)

      const startTime = Date.now(); // Capture the start time

      const response = await axios.post(
        `${BASE_URL}/convert`,
        { video_id, type }, 
        {
          headers: {
            'token': `${token}`,
          },
          responseType: 'blob', // Ensure we get a Blob response
        }
      );

      const endTime = Date.now(); // Capture the end time
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds
      setConversionTime(timeTaken); // Set final time taken
      setIsConverting(false); // Stop conversion

      // Convert response data to Blob and create a URL
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob); 

      setVideoUrl(videoUrl); // Set video URL for playback and download
      console.log('Converted Video Blob URL:', videoUrl);
    } catch (error) {
      console.error('Error converting video:', error.response?.data?.message || error.message);
      setIsConverting(false); 
    }
  };

  // Function to handle downloading the converted video
  const downloadConvertedVideo = () => {
    if (videoUrl) {
      saveAs(videoUrl, 'converted-video.mp4'); // Use FileSaver to download the converted video
    } else {
      alert('No video available to download!');
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex justify-center">
      <div className="w-full max-w-6xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Your Videos</h2>
        
        {isConverting ? (
          <p style={{color: 'red', padding: '3px'}}>Time passed: {timer} seconds</p>
        ) : conversionTime && (
          <p style={{color: 'red', padding: '3px'}}>Total time taken: {conversionTime} seconds</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{video.title}</h2>
              <p className="text-gray-800 mb-4">User ID: {video.user_id}</p>
              <div className="flex space-x-4">
                <select
                  className="border rounded-md px-2 py-1"
                  onChange={(e) => setSelectedTypes({ ...selectedTypes, [video._id]: e.target.value })}
                  value={selectedTypes[video._id] || 'mp4'}
                >
                  <option value="mp4">MP4</option>
                  <option value="avi">AVI</option>
                  <option value="mkv">MKV</option>
                  <option value="mov">MOV</option>
                </select>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => convertVideo(video._id)}
                >
                  Convert
                </button>
              </div>
            </div>
          ))}
        </div>

        {videoUrl && (
          <>
            <video controls width="600" className="mt-6">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Download button for the converted video */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
              onClick={downloadConvertedVideo}
            >
              Download Converted Video
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewVideos;


