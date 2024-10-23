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
      <div className="flex justify-between">
        <IonCard className="w-44 rounded-xl">
          <IonCardHeader className="h-44 p-0">
            <img
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </IonCardHeader>
          <IonCardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-blue-gray-700 font-medium">
                Apple AirPods
              </span>
              <span className="text-blue-gray-700 font-medium">
                $95.00
              </span>
            </div>
          </IonCardContent>
          <IonCardContent className="pt-0">
            <button  className="bg-blue-gray-900 text-blue-gray-900 hover:scale-105" onClick={() => history.push("/ViewProduct")} >
              Add to Cart
            </button>
          </IonCardContent>
        </IonCard>

        <IonCard className="w-44 rounded-xl">
          {/* Segunda card con el mismo contenido */}
        </IonCard>
      </div>
    </div>
  );
};

export default HomePage;