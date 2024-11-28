import { IonPage, useIonViewDidEnter } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";
import { IAnuncio } from "../interfaces/IAnuncio";
import anunciosService from "../services/AnunciosServices";

const MyAdvert: React.FC = () => {
  const history = useHistory();
  const route = history.location;
  const [anuncios, setAnuncios] = useState<IAnuncio[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnuncios = async () => {
    try {
      setIsLoading(true);
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
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-900">
          <LoadingWave />
        </div>
      )}
      <div className="min-h-screen bg-slate-900">
        <Header title="Mis Anuncios" />

        {/* Botón de crear nuevo anuncio */}
        <div className="p-4">
          <button
            className="w-full max-w-lg mx-auto py-3 px-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg shadow-indigo-900/20"
            onClick={() => history.push("/dashboard/profile/MyAdvert/ProductCreate")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Crear nuevo anuncio
          </button>
        </div>

        {/* Lista de productos */}
        <div className="px-4 pb-4 overflow-y-auto h-[calc(100vh-180px)]">
          <div className="grid grid-cols-2 gap-3">
            {anuncios.length > 0 ? (
              anuncios.map((anuncio, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-green-500 transition-all duration-300 shadow-xl"
                  onClick={() => history.push(route.pathname + "/ViewProduct/" + anuncio.id)}
                >
                  <div className="relative w-full aspect-square">
                    <img
                      src={
                        anuncio.productos?.fotos[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      className="w-full h-full object-cover bg-slate-800"
                      alt={anuncio.productos?.nombre || "Producto"}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                      {anuncio.productos?.nombre || "Sin nombre"}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-400 text-sm">MX$</span>
                      <span className="text-green-400 text-lg font-bold">
                        {anuncio.precio_anuncio}
                      </span>
                    </div>
                    <button
                      className="w-full bg-slate-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-700 hover:border-indigo-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(route.pathname + "/ViewProduct/" + anuncio.id);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))
            ) : null}
          </div>
          {anuncios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mb-3 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>
              <p className="text-center font-medium">
                No hay anuncios en este momento.
              </p>
              <p className="text-sm text-slate-500">
                Crea tu primer anuncio usando el botón superior
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </IonPage>
  );
};

export default MyAdvert;