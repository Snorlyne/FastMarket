import React from 'react';
import Lottie from "lottie-react";
import animationData from './Animation - 1731973840283.json'

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-50 h-50"> 
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Loader;