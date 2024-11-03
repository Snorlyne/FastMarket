import { IonPage } from '@ionic/react';
import Header from '../components/Header';
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import LoadingWave from '../components/Loader';


const Mysale: React.FC = () => {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);


  
  return (
    <IonPage>
   {/*  {isLoading && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
        <LoadingWave />
      </div>
    )} */}
    <div className="min-h-screen bg-gray-100">
      <Header title="Mis Ventas" />
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-xl text-black  font-medium mb-3">
          Mis ventas Realizadas:
        </h2>
        <div className="max-w-4xl mx-auto px-4 py-4 overflow-y-auto h-[75vh]">
          <div className="grid grid-cols-1 gap-4 space-y-4">
         
                <div
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="relative w-full aspect-square">
                    <img
                         src="https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"

                      className="w-full h-full object-cover bg-gray-200"
                    />
                  </div>
                  <div className="p-2 space-y-1">
                    <h3 className="text-lg font-bold text-gray-600">
                      silla Gamers de la sia
                    </h3>
                    <p className="text-red-500">
                      Vendido
                    </p>
                  </div>
                </div>
              ))
            {/* ) : (
              <p className="w-full text-center text-gray-500">
                No hay ofertas en este momento.
              </p>
            ) */}
          </div>
        </div>
      </div>

    
    </div>
  </IonPage>

  );
};

export default Mysale;
