import React from 'react';
import Lottie from "lottie-react";
import animationData from './Animation - 1731973840283.json'

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"> 
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Loader;