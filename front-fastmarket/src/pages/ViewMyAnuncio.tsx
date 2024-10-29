import { IonPage, useIonViewDidEnter } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";
import { IAnuncio } from "../interfaces/IAnuncio";
import anunciosService from "../services/AnunciosServices";

const ViewMyAnuncio: React.FC = () => {
  const history = useHistory();
  const [anuncios, setAnuncios] = useState<IAnuncio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAnuncios = async () => {
    try {
      setIsLoading(true); // Start loading animation
      const response = await anunciosService.getAllByToken();
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
  return (
    <IonPage>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      )}
      <div className="min-h-screen bg-gray-100">
        <Header title="Mis publicaciones" />

        <div className="p-2 m-2">
          <div className="flex items-center justify-center sticky top-0 z-10">
            <button
              className="w-80 mt-3 py-2.5 p-8 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => history.push("/dashboard/profile/misAnuncios/publicarAnuncio")}
            >
              Crear publicación
            </button>
          </div>
        </div>

        {/* Scrollable product list */}
        <div className="max-w-4xl mx-auto px-4 py-4 overflow-y-auto h-[80vh]">
            {/* Map sobre los anuncios obtenidos */}
            <div className="grid grid-cols-2 gap-4">
            {anuncios.length > 0 ? (
              anuncios.map((anuncio, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="relative w-full aspect-square">
                      {/* Mostrar imagen del primer producto en el anuncio */}
                      <img
                        src={
                          anuncio.productos?.fotos[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        className="w-full h-full object-cover bg-gray-200"
                        alt={anuncio.productos?.nombre || "Producto"}
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <h3 className="text-xl font-bold text-gray-600">
                        {anuncio.productos?.nombre || "Sin nombre"}
                      </h3>
                      <p className="text-lg font-medium text-gray-500">
                        MX$
                        <span className="text-green-400 text-lg font-bold">
                          {anuncio.precio_anuncio}
                        </span>
                      </p>
                      <button
                        className="w-full bg-blue-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                        onClick={() => history.push("/ViewProduct")}
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
              ))
            ): null}
            </div>
            {anuncios.length == 0 ? (
              <p className="w-full text-center text-gray-500">
                No hay ofertas en este momento.
              </p>
            ) : null }
          </div>
        </div>
    </IonPage>
  );
};

export default ViewMyAnuncio;
