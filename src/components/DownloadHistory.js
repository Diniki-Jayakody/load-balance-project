import React from 'react';

const downloadHistory = [
  { id: 1, title: 'Sample Video 1', status: 'Success', date: '2024-09-10 14:32' },
  { id: 2, title: 'Sample Video 2', status: 'Crashed', date: '2024-09-10 12:45' },
  { id: 3, title: 'Sample Video 3', status: 'Success', date: '2024-09-09 18:00' },
];

const DownloadHistory = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-5xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Download History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Video Title</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {downloadHistory.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{entry.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-full font-semibold ${
                        entry.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{entry.date}</td>
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
