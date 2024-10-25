import { IonIcon, IonPage } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { IonCard, IonCardHeader, IonCardContent, IonButton } from '@ionic/react';
import LoadingWave from "../../components/Loader";
import { useHistory } from "react-router";


const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <LoadingWave />
      </div>
    );
  }

  return (
    <div className="p-4 h-screen bg-white">
      {/* Título de la página */}
      <div className="block justify-center text-center">
        <h2 className="text-2xl text-black font-bold mb-1">
          Subasta de productos
        </h2>
        <p className="text-md text-black mb-4">Encuentra tus productos</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 pl-10 pr-10 text-black border-b-2 rounded-lg bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </div>

      {/* Productos */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-2xl text-black font-medium mb-3">Subasta del momento:</h2>
        <div className="grid grid-cols-2 gap-4">

          {/* Cards del producto */}
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full aspect-square">
        <img 
          src={ "https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"} 
          className="w-full h-full object-cover bg-gray-200"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-xl font-bold text-gray-600">Silla de oficina</h3>
        <p className="text-lg font-medium text-gray-500">MX$<span className="text-green-400 text-lg font-bold">500</span></p>
        <button 
          className="w-full bg-green-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-green-800 transition-colors" onClick={() => history.push("/ViewProduct")}
        >
          ENTRAR
        </button>
      </div>
    </div>

  


   
        </div>
      </div>
    </div>
  );
};

export default HomePage;