import React, { useState, useEffect } from "react";
import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { IAnuncio } from "../interfaces/IAnuncio";
import anunciosService from "../services/AnunciosServices";
import Header from '../components/Header';
import LoadingWave from "../components/Loader";

interface ViewParams {
  id: string;
}

const ViewProduct: React.FC = () => {
  const { id } = useParams<ViewParams>();
  const [anuncio, setAnuncio] = useState<IAnuncio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();


  useIonViewDidEnter(() => {
    fetchAnuncio();
  }, [id]);

  const fetchAnuncio = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await anunciosService.getById(id);

      if (response.isSuccess && response.result) {
        setAnuncio(response.result);
      } else {
        setError(response.message || 'Error al cargar el anuncio');
      }
    } catch (error) {
      setError('Error inesperado al cargar el anuncio');
      console.error("Error fetching anuncio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeOffer = () => {
    history.push(`${history.location.pathname}/offerhub/${id}`);
  };

  if (isLoading) {
    return (
      <IonPage>
        <div className="fixed h-screen  inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchAnuncio}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header title={anuncio?.productos?.nombre ?? 'Detalles del Producto'} />
      <div className="flex flex-col h-[95%] bg-white">
        <div className=" h-full">
          {/* Carrusel de Imágenes */}
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="flex snap-x snap-mandatory">
                {anuncio?.productos?.fotos?.map((foto, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-center p-2 h-80"
                  >
                    <img
                      className="w-full h-full rounded-lg object-contain bg-gray-100"
                      src={foto.url}
                      alt={`${anuncio.productos.nombre} - Imagen ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detalles del Producto */}
          <div className="flex-1 p-4 space-y-6 h-[48vh] flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {anuncio?.productos?.nombre}
                </h1>
                <p className="text-xl font-semibold text-green-600">
                  Precio anunciado: MX${anuncio?.productos?.precio?.toLocaleString()}
                </p>
              </div>

              {/* Ofertas */}
              {anuncio?.ofertas && anuncio.ofertas.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Mejores Ofertas:
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {anuncio.ofertas.map((oferta, index) => (
                      <div
                        key={index}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg"
                      >
                        Oferta {index + 1}: ${oferta.monto?.toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Descripción */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Descripción:
                </h3>
                <p className="text-gray-600 text-justify">
                  {anuncio?.descripcion || "Sin descripción disponible."}
                </p>
              </div>

              {/* Botón de Oferta */}
              {anuncio?.propietario ? (
                <button
                  onClick={handleMakeOffer}
                  className="w-full bg-green-500 text-white py-3 rounded-lg 
                   font-semibold transition-colors hover:bg-green-600 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:ring-offset-2"
                >
                  Ver propuestas
                </button>
              ) :
                <button
                  onClick={handleMakeOffer}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg 
                     font-semibold transition-colors hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2"
                >
                  Enviar propuesta al vendedor
                </button>
              }
            </div>
            {anuncio?.propietario && (

              <button
                onClick={() => history.replace(`${history.location.pathname}/EditAdvert/${anuncio.id}`)}
                className="w-full bg-blue-500 text-white py-3 rounded-lg 
                     font-semibold transition-colors hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2"
              >
                Modificar
              </button>
            )}
          </div>

        </div>
      </div>
    </IonPage>
  );
};

export default ViewProduct;