import React, { useState, useEffect } from "react";
import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { IAnuncio } from "../interfaces/IAnuncio";
import anunciosService from "../services/AnunciosServices";
import Header from '../components/Header';
import LoadingWave from "../components/Loader";

// Componentes separados para mejor organización
const ImageCarousel: React.FC<{ images: Array<{ url: string }>, productName: string }> = ({ images, productName }) => (
  <div className="w-full bg-gray-900">
    <div className="relative overflow-x-auto">
      <div className="flex snap-x snap-mandatory">
        {images?.map((foto, index) => (
          <div key={index} className="w-full flex-shrink-0 snap-center p-2 h-64">
            <img
              className="w-full h-full object-contain rounded-lg transition-transform hover:scale-105"
              src={foto.url}
              alt={`${productName} - Imagen ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Indicadores de navegación */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images?.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-white/50"
          />
        ))}
      </div>
    </div>
  </div>
);

const OffersSection: React.FC<{ offers: Array<{ monto: number }> }> = ({ offers }) => (
  <div className="mb-1">
    <h2 className="text-lg font-semibold text-gray-100 mb-2 flex items-center">
      <span className="mr-2">Mejores Ofertas</span>
      <span className="text-sm bg-green-600 text-white px-2 py-1 rounded-full">
        {offers.length}
      </span>
    </h2>
    <div className="flex flex-wrap gap-2">
      {offers.map((oferta, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          ${oferta.monto?.toLocaleString()}
        </div>
      ))}
    </div>
  </div>
);

const ActionButtons: React.FC<{
  isOwner: boolean,
  onMakeOffer: () => void,
  onEdit: () => void
}> = ({ isOwner, onMakeOffer, onEdit }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm p-4 space-y-2">
    {isOwner ? (
      <div className="space-y-2">
        <button
          onClick={onMakeOffer}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold transition-all hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
        >
          Ver propuestas
        </button>
        <button
          onClick={onEdit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold transition-all hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          Modificar
        </button>
      </div>
    ) : (
      <button
        onClick={onMakeOffer}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold transition-all hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
      >
        Enviar propuesta al vendedor
      </button>
    )}
  </div>
);

const ErrorView: React.FC<{ error: string, onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-screen p-4 bg-slate-900">
    <div className="bg-red-500/10 p-6 rounded-lg text-center max-w-md">
      <p className="text-red-400 text-center mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
      >
        Reintentar
      </button>
    </div>
  </div>
);

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anuncio, setAnuncio] = useState<IAnuncio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

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

  useIonViewDidEnter(() => {
    fetchAnuncio();
  });

  const handleMakeOffer = () => {
    history.push(`${history.location.pathname}/offerhub/${id}`);
  };

  const handleEdit = () => {
    history.replace(`${history.location.pathname}/EditAdvert/${anuncio?.id}`);
  };

  if (isLoading) {
    return (
      <IonPage>
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-900">
          <LoadingWave />
        </div>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <ErrorView error={error} onRetry={fetchAnuncio} />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <div className="flex flex-col h-screen bg-slate-900">
        <div className="flex-1 pb-24">
          <Header title={anuncio?.productos?.nombre ?? 'Detalles del Producto'} />

          {/* Image Carousel */}
          {anuncio?.productos?.fotos && (
            <ImageCarousel
              images={anuncio.productos.fotos}
              productName={anuncio.productos.nombre}
            />
          )}

          {/* Content Section */}
          <div className="p-4 space-y-4">
            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-100">
                {anuncio?.productos?.nombre}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-medium text-green-500">
                  MX${anuncio?.productos?.precio?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400">
                  Precio anunciado
                </span>
              </div>
            </div>

            {/* Offers Section */}
            {anuncio?.ofertas && anuncio.ofertas.length > 0 && (
              <OffersSection offers={anuncio.ofertas} />
            )}

            {/* Description */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Descripción
              </h3>
              <p className="text-gray-400 text-justify leading-relaxed">
                {anuncio?.descripcion || "Sin descripción disponible."}
              </p>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          isOwner={!!anuncio?.propietario}
          onMakeOffer={handleMakeOffer}
          onEdit={handleEdit}
        />
      </div>
    </IonPage>
  );
};

export default ViewProduct;