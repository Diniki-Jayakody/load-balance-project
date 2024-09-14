import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import InsertVideoForm from '../components/InsertVideoForm';
import VideoList from '../components/VideoList';
import DownloadHistory from '../components/DownloadHistory';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('insertVideo');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation
  const navigate = useNavigate(); // Hook to handle redirection

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/'); // useNavigate to redirect
  };

  // Function to render the active tab's content
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
      {/* Header with Logout button */}
      <div className="w-full max-w-4xl mt-8 flex justify-between items-center">
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

        {/* Logout Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => setShowLogoutConfirm(true)} // Show confirmation popup
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="mt-6 w-full max-w-4xl">
        {renderTabContent()}
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowLogoutConfirm(false)} // Cancel button
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout} // Confirm logout and clear token
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

