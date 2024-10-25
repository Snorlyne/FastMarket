import React from 'react';
import './css/Loader.css'; 

const LoadingWave: React.FC = () => {
  return (
    <div className="loading-wave">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
    </div>
  );
};

export default LoadingWave;
