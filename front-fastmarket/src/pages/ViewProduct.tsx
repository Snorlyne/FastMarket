import React from 'react';
import 'tailwindcss/tailwind.css'; 
import Header from '../components/Header';
import './css/product.css';

const ViewProduct = () => {
  return (
    <div className=" view-product-container"> 
      <Header title="producto" />

      <div className="carousel relative">
        <div className="relative overflow-x-scroll">
          <div className="flex">
            {/* Carousel Slide 1 */}
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
              {/* Replace with actual images */}
              <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"
                alt="Item 1"
              />
            </div>
            {/* Carousel Slide 2 */}
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_735076-MLU72542109380_112023-O.webp"
                alt="Item 2"
              />
            </div>
            {/* Carousel Slide 3 */}
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_613832-MLU72831725899_112023-O.webp"
                alt="Item 3"
              />
            </div>
          </div>
        </div>
        {/* Carousel Indicators (Optional) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-4">
          <button className="w-3 h-3 bg-gray-400 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-400 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-600 rounded-full"></button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-black">Silla de escritorio</h1>
        <p className="text-green-600">MX$600</p>

        <div className="my-4">
          <h2 className="text-md font-semibold text-black">Ofertas del momento:</h2>
          <div className="flex space-x-2 mt-2">
            <button className="bg-green-600 py-2 px-4 rounded-lg">1. Oferta: $1000</button>
            <button className="bg-green-600 py-2 px-4 rounded-lg">2. Oferta: Ver producto</button>
            <button className="bg-green-600 py-2 px-4 rounded-lg">1. Oferta: $1000</button>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
          Enviar propuesta al vendedor
        </button>

        <div className="mt-6">
          <h3 className="text-md font-semibold">Descripción:</h3>
          <p className="text-gray-600 text-justify">
            Es momento de ese cambio que tanto esperabas en tu hogar, home office u oficina. Con la
            Silla Ejecutiva de Oficina de respaldo alto obtendrás una comodidad inigualable.
          </p>
          <p className="text-black mt-2">Estado: Nuevo</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
