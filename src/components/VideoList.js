import React,{useEffect, useState} from 'react';
import axios from 'axios';
import BASE_URL from '../config'; 


const ViewVideos = () => {
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null); 
  const [conversionTime, setConversionTime] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get('http://3.110.132.203:3000/user/get_videos', {
          headers: {
            'token': `${token}`
          }
        });
        const videosArray = response.data.data?.data_ || [];
        if (Array.isArray(videosArray)) {
          setVideos(videosArray);  // Set the videos array in state
        } else {
          console.error('Expected an array, but got:', videosArray);
        }
        console.log('videos', videos)
      } catch (error) {
        console.error('Error fetching videos:', error.response?.data?.message || error.message);
      }
    };
    
    fetchVideos();
  }, []);

  const convertVideo = async (video_id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const type = 'mp4';

      const startTime = Date.now();
      
      // Make sure the response is in blob format
      const response = await axios.post(
        `${BASE_URL}/convert`,
        { video_id, type }, // Post data here
        {
          headers: {
            'token': `${token}`,
          },
          responseType: 'blob', // Ensure we get a Blob response
        }
      );
      const endTime = Date.now();
      
      // Calculate time difference in seconds
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      setConversionTime(timeTaken);


      // Convert response data to Blob and create a URL
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob); // Create a URL for the blob

      setVideoUrl(videoUrl); // Store the video URL in state
      console.log('Video Blob URL:', videoUrl);

    } catch (error) {
      console.error('Error converting video:', error.response?.data?.message || error.message);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Your Videos</h2>
        {conversionTime && (
        <p style={{color:'red', padding:'3px'}}>Time taken for conversion: {conversionTime} seconds</p>
      )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{video.title}</h2>
              <p className="text-gray-800 mb-4">User ID: {video.user_id}</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => convertVideo(video._id)}
                >
                  Convert
                </button>
                {/* <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => console.log('Download', video._id)}
                >
                  Download
                </button> */}
              </div>
            </div>
          ))}
        </div>
        {videoUrl && (
          <video controls width="600">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      )}
      </div>
    </div>
  );
};

export default ViewVideos;
