import React from 'react';

const LoadingCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-row gap-4 animate-pulse">
      <div className="w-32 h-32 bg-gray-700 rounded-lg flex-shrink-0"></div>

      <div className="flex-grow space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-5 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-10 bg-gray-700 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

export default LoadingCard;