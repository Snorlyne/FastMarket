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

const MyBuy: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [ventas, setVentas] = useState<Venta[]>([]);

  const fetchVentas = async () => {
    setIsLoading(true);
    const fetchCompras = await ventasServices.getCompras();
    setVentas(fetchCompras);
    setIsLoading(false);
  };

  useIonViewDidEnter(() => {
    fetchVentas();
  }, []);

  return (
    <IonPage>
      <div className="h-screen flex flex-col bg-slate-900">
        <Header title="Mis Compras" />
        <div className="p-2" />

        {isLoading ? (
          <LoadingWave />
        ) : (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="h-screen mx-auto">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">Mis Compras</h2>
              {ventas.length > 0 ? (
                <div className="flex flex-col gap-4 pb-4">
                  {ventas.map((venta) => (
                    <div
                      key={venta.id}
                      className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-row gap-4"
                      onClick={() => history.push(history.location + '/chat/' + venta.ofertas[0].id)}
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
                        <span className="text-gray-400">Comprado por:</span>
                          <span className="text-2xl font-bold text-green-500">
                            $ {venta.ofertas[0].monto}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${venta.estado === "vendido" ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400' 
                            }`}>
                            Comprado
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>

                  <p className="text-center font-medium">
                    No hay compras en este momento.
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

export default MyBuy;
