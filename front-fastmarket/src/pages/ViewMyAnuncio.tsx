import { IonPage } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";

const ViewMyAnuncio: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <IonPage>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      )}
      <div className="min-h-screen bg-gray-100">
        <Header title="Mis publicaciones" />

        {/* Sticky button */}
        <div className="p-2 m-2">
          <div className="flex items-center justify-center sticky top-0 z-10">
            <button
              className="w-80 mt-3 py-2.5 p-8 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => history.push("/ProductCreate")}
            >
              Crear publicación
            </button>
          </div>
        </div>

        {/* Scrollable product list */}
        <div className="max-w-4xl mx-auto px-4 py-4 overflow-y-auto h-[80vh]">
          <div className="grid grid-cols-2 gap-4">
            {/* Product cards */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative w-full aspect-square">
                  <img
                    src="https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"
                    className="w-full h-full object-cover bg-gray-200"
                    alt="Silla de oficina"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-xl font-bold text-gray-600">
                    Silla de oficina
                  </h3>
                  <p className="text-lg font-medium text-gray-500">
                    MX$
                    <span className="text-green-400 text-lg font-bold">
                      500
                    </span>
                  </p>
                  <button
                    className="w-full bg-blue-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    onClick={() => history.push("/ViewProduct")}
                  >
                    ENTRAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default ViewMyAnuncio;
