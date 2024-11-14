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
      <div className="h-screen bg-gray-900 flex flex-col">
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
                <p className="text-gray-400">No tienes ventas activas</p>
              )}
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};

export default Mysale;