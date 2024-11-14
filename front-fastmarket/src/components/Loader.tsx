import React from 'react';

const LoadingWave:React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-950">

      <div className="w-[300px] h-[100px] flex justify-center items-end">
        <div className="w-5 h-[10px] mx-[5px] bg-green-700 rounded-md animate-wave"></div>
        <div className="w-5 h-[10px] mx-[5px] bg-green-700 rounded-md animate-wave delay-100"></div>
        <div className="w-5 h-[10px] mx-[5px] bg-green-700 rounded-md animate-wave delay-200"></div>
        <div className="w-5 h-[10px] mx-[5px] bg-green-700 rounded-md animate-wave delay-300"></div>
      </div>
    </div>
  );
};

export default LoadingWave;