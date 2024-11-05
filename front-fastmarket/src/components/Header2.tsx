import React from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useHistory } from 'react-router-dom';



const Header = ({ title }: { title: string }) => {
    const history = useHistory(); 
    

    const goBack = () => {
        history.goBack(); 
    };


  return (
    <header className="bg-black text-white px-4 py-3 flex items-center justify-between">
      <button 
        className="flex items-center justify-center p-1 hover:bg-gray-800 rounded-full"
        onClick={goBack}
      >
    <ArrowLeftIcon className="w-6 h-6 text-gray-300 " />

      </button>
      
      <h1 className="text-lg font-medium">{title}</h1>
      
  
    </header>
  );
};

export default Header;