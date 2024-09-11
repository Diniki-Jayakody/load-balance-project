import React, { useState } from 'react';
import InsertVideoForm from '../components/InsertVideoForm';
import VideoList from '../components/VideoList';
import DownloadHistory from '../components/DownloadHistory';



const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('insertVideo');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'insertVideo':
        return <InsertVideoForm />;
      case 'viewVideos':
        return <VideoList />;
      case 'downloadHistory':
        return <DownloadHistory />;
      default:
        return <InsertVideoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8">
        <div className="flex justify-center border-b border-gray-300">
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === 'insertVideo' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            } hover:text-blue-500 focus:outline-none`}
            onClick={() => setActiveTab('insertVideo')}
          >
            Insert Video
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === 'viewVideos' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            } hover:text-blue-500 focus:outline-none`}
            onClick={() => setActiveTab('viewVideos')}
          >
            View Videos
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === 'downloadHistory' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            } hover:text-blue-500 focus:outline-none`}
            onClick={() => setActiveTab('downloadHistory')}
          >
            Download History
          </button>
        </div>

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

