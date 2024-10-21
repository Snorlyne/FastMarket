import { IonIcon, IonPage } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="p-4 h-screen bg-white">
      {/* Título de la página */}
      <div className="block justify-center text-center">
        <h2 className="text-2xl  text-black font-bold mb-1">
          Subasta de productos
        </h2>
        <p className="text-md  text-black mb-4">Encuentra tus productos</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primer Producto */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold">Silla de escritorio</h3>
          <p className="text-gray-600">MX$500</p>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 hover:bg-green-600 transition-colors">
            Entrar
          </button>
        </div>

        {/* Segundo Producto */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold">Silla de escritorio</h3>
          <p className="text-gray-600">MX$500</p>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 hover:bg-green-600 transition-colors">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
