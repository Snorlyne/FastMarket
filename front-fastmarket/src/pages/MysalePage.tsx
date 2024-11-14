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
      <div className="min-h-screen bg-slate-900">
        <Header title="Mis ventas" />
        <div className="p-2 m-2" />

        {isLoading ? (
          <LoadingWave />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h2 className="text-2xl text-white font-medium mb-3">Mis Ventas:</h2>
            <div className="grid grid-cols-2 gap-4">
              {ventas.map((venta) => (
                <div key={venta.id} onClick={() => history.push(history.location+'/chat/'+venta.ofertas[0].id)} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative w-full aspect-square">
                    <img
                      src={venta.productos.fotos[0]?.url || "https://via.placeholder.com/150"}
                      className="w-full h-full object-cover bg-gray-200"
                      alt={venta.productos.nombre}
                    />
                  </div>
                  <div className="p-2 space-y-1 block">
                    <h3 className="text-xl font-bold text-gray-600">{venta.productos.nombre}</h3>
                    <div className='flex justify-between'>
                      <p className={`text-lg font-bold text-green-700`}>
                        Precio inicial
                      </p>
                      <p className="text-gray-700 font-medium">${venta.precio_anuncio}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className={`text-lg font-bold ${venta.estado === "vendido" ? 'text-red-400' : 'text-green-400'}`}>
                        {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)} por 
                      </p>
                      <p className="text-gray-700 font-medium">${venta.ofertas[0].monto}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};

export default Mysale;
