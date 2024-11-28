import React, { useState } from "react";
import { useIonViewDidEnter } from "@ionic/react";
import anunciosService from "../../services/AnunciosServices";
import { IonPage } from "@ionic/react";
import LoadingWave from "../../components/Loader";
import { useHistory } from "react-router";
import { IAnuncio } from "../../interfaces/IAnuncio";

const HomePage: React.FC = () => {
  const [anuncios, setAnuncios] = useState<IAnuncio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const history = useHistory();
  const route = history.location;

  const fetchAnuncios = async () => {
    try {
      setIsLoading(true);
      const response = await anunciosService.getAll();
      if (response.isSuccess && response.result) {
        setAnuncios(response.result);
        console.log("Anuncios obtenidos:", response.result);
      } else {
        console.log("Error fetching anuncios: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching anuncios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    fetchAnuncios();
  });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % anuncios.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + anuncios.length) % anuncios.length);

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900 ">
          <LoadingWave />
        </div>
      )}
      <div className="bg-slate-900 h-screen text-white p-4 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="items-center gap-2 p-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              FastMarket
            </h1>
            <p className="text-md ">
              Encuentra tus productos
            </p>
          </div>

        </header>

        {/* Carousel Section */}
        <div className="mt-4 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-64">
              <div 
                className="absolute w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {anuncios.map((anuncio, index) => (
                  <div
                    key={anuncio.id}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ left: `${index * 100}%` }}
                  >
                    <img
                      src={anuncio.productos.fotos[0]?.url || 'default-image.jpg'}
                      alt={anuncio.productos.nombre || 'Producto'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 p-4 w-full">
                        <h3 className="text-xl font-bold mb-1">{anuncio.productos.nombre}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2 mb-3">{anuncio.descripcion}</p>
                        <button 
                          className="w-full bg-green-600/90 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg transition-all active:scale-95 shadow-lg"
                          onClick={() => history.push(route.pathname + "/ViewProduct/" + anuncio.id)}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de navegación mejorados */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm transition-all active:scale-90"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm transition-all active:scale-90"
              >
                ›
              </button>

              {/* Indicadores mejorados */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
                {anuncios.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-white w-4' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        {/* Popular Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Más Publicaciones</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {anuncios.map((anuncio) => (
              <div
                key={anuncio.id}
                onClick={() => history.push(`/dashboard/home/ViewProduct/${anuncio.id}`)}
                className="bg-gray-800 rounded-xl p-3"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={anuncio.productos.fotos[0]?.url || 'default-image.jpg'}
                    alt={anuncio.productos.nombre || 'Producto'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-gray-400 mb-2">{anuncio.productos.nombre}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-400">
                    {anuncio.precio_anuncio} MXN
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default HomePage;
