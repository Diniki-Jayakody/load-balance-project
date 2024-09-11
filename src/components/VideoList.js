import React from 'react';

const videos = [
  {
    id: 1,
    title: 'Sample Video 1',
    thumbnail: 'https://via.placeholder.com/150', 
  },
  {
    id: 2,
    title: 'Sample Video 2',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Sample Video 3',
    thumbnail: 'https://via.placeholder.com/150',
  },
];

const ViewVideos = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Your Videos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
       
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded-md mb-4" />

              <h3 className="text-lg font-semibold text-gray-800 mb-4">{video.title}</h3>

              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => console.log('Convert', video.id)}
                >
                  Convert
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => console.log('Download', video.id)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewVideos;
