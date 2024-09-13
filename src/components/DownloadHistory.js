import React,{useEffect, useState} from 'react';
import axios from 'axios';



const DownloadHistory = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDownloadedVideos = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get('http://3.110.132.203:3000/user/get_downloads', {
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
    
    fetchDownloadedVideos();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-5xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Download History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Video ID</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">User ID</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Date</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{entry.video_id}</td>
                  <td className="px-6 py-4 text-gray-800">{entry.user_id}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(entry.time_stamp/1000).toLocaleString()}</td>
                  <td className="px-6 py-4">{entry.download_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownloadHistory;
