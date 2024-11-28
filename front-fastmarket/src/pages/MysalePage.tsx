import { IonPage, useIonViewDidEnter } from '@ionic/react';
import Header from '../components/Header';
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import LoadingWave from '../components/Loader';
import ventasServices from '../services/VenatsServices';

interface Venta {
  id: number;
  estado: string;
  productos: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    tipo: string;
    fotos: { id: number; url: string }[];
  };
  ofertas: any;
  precio_anuncio: number;
  descripcion: string;
}

const Mysale: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [ventas, setVentas] = useState<Venta[]>([]);

  const fetchVentas = async () => {
    setIsLoading(true);
    const fetchedVentas = await ventasServices.getVentas();
    setVentas(fetchedVentas);
    setIsLoading(false);
  };

  useIonViewDidEnter(() => {
    fetchVentas();
  }, []);

  return (
    <IonPage>
      <div className="h-screen flex flex-col bg-slate-900">
        <Header title="Mis Ventas" />
        <div className="p-2" />

        {isLoading ? (
          <LoadingWave />
        ) : (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="h-screen mx-auto">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">Mis Ventas</h2>
              {ventas.length > 0 ? (
                <div className="flex flex-col gap-4 pb-4">
                  {ventas.map((venta) => (
                    <div 
                      key={venta.id} 
                      className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-row gap-4"
                      onClick={() => history.push(history.location+'/chat/'+venta.ofertas[0].id)}
                    >
                      {/* Contenedor de imagen */}
                      <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        {venta.productos.fotos.length > 0 ? (
                          <img
                            src={venta.productos.fotos[0].url}
                            alt={venta.productos.nombre}
                            className="w-32 h-32 object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            Sin Imagen
                          </div>
                        )}
                      </div>

                      {/* Contenedor de información */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-gray-200 mb-2">
                          {venta.productos.nombre}
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Precio inicial:</span>
                          <span className="text-2xl font-bold text-gray-200">
                            $ {venta.precio_anuncio}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Oferta actual:</span>
                          <span className="text-2xl font-bold text-green-500">
                            $ {venta.ofertas[0].monto}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            venta.estado === "vendido" ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
               viewBox="0 0 24 24" 
               strokeWidth={1.5}
                stroke="currentColor" 
                className="w-12 h-12 mb-3 text-slate-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>

                <p className="text-center font-medium">
                  No hay ventas en este momento.
                </p>
               
              </div>
              )}
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};

export default Mysale;