import React, { useState } from "react";
import { useIonViewDidEnter } from "@ionic/react";
import anunciosService from "../../services/AnunciosServices";
import { IonPage } from "@ionic/react";
import LoadingWave from "../../components/Loader";
import { useHistory } from "react-router";
import Modal from "../../components/Modals/Modal";
import { IAnuncio } from "../../interfaces/IAnuncio";
import HeaderHome from "../../components/Header copy";

const HomePage: React.FC = () => {
  const [anuncios, setAnuncios] = useState<IAnuncio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const route = history.location
  const fetchAnuncios = async () => {
    try {
      setIsLoading(true); // Start loading animation
      const response = await anunciosService.getAll();
      if (response.isSuccess && response.result) {
        setAnuncios(response.result); // Set the anuncios state
        console.log("Anuncios obtenidos:", response.result); // Log the fetched anuncios for debugging purposes
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
      <HeaderHome title="FastMarket"/>
      <div className="min-h-screen overflow-y-auto bg-gray-100">
        <div className="py-1 my-4">
          <h2 className="text-2xl text-black text-center font-bold mb-1">
            Subasta de productos
          </h2>
          <p className="text-md text-black text-center">
            Encuentra tus productos
          </p>
        </div>
        <div className="pt-4 w-screen inline-block bg-red-400 rounded-sm items-center shadow-md">
          <h2 className="text-white text-xl text-center font-semibold">
            {" "}
            Productos del momento
          </h2>
          <div className="overflow-x-auto whitespace-nowrap py-4 mx-4">
            <div className="flex space-x-4">
              {anuncios.map((anuncio, index) => (
                <div onClick={() => history.push("/dashboard/home/ViewProduct/"+anuncio.id)}
                  key={index}
                  className="inline-block bg-white rounded-lg shadow-lg p-4 w-11/12 flex-shrink-0"
                >
                  <h3 className="text-lg text-gray-700 font-semibold">
                    {anuncio.productos.nombre ?? "Sin nombre"}
                  </h3>
                  <p className="text-gray-950">
                    Precio hasta ahora:{" "}
                    <span className="text-red-600">
                      {anuncio.precio_anuncio}$MXN
                    </span>
                  </p>
                  <div>
                    {anuncio.productos.fotos.length > 0 && (
                      <img
                        src={anuncio.productos.fotos[0].url}
                        alt={anuncio.productos.nombre}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    )}
                    <p className="text-gray-600 mt-2 truncate">
                      {anuncio.descripcion}
                    </p>
                  </div>

                  <button 
                  className="w-full bg-transparent text-green-600 py-1 rounded-lg mt-2 hover:text-green-700 transition-colors" 
                  onClick={() => history.push(route.pathname+"/ViewProduct/"+anuncio.id)}
                  >
                    Entrar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 w-screen py-4 bg-slate-100  inline-block  rounded-sm items-center ">
          <h2 className="text-black text-xl text-center font-semibold">
            Más productos anunciados
          </h2>
          <div className="py-4 mx-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {anuncios.map((anuncio, index) => (
                <div onClick={() =>  history.push("/dashboard/home/ViewProduct/"+anuncio.id)}
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-4 w-full"
                >
                  <h3 className="text-lg text-gray-700 font-semibold">
                    {anuncio.productos.nombre ?? "Sin nombre"}
                  </h3>
                  <div>
                    {anuncio.productos.fotos.length > 0 && (
                      <img
                        src={anuncio.productos.fotos[0].url}
                        alt={anuncio.productos.nombre}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    )}
                    <p className="text-gray-600 mt-2 truncate">
                      {anuncio.descripcion}
                    </p>
                    <p className="text-gray-950">
                    <span className="text-red-600">
                      {anuncio.precio_anuncio}$MXN
                    </span>
                  </p>
                  </div>
                  {/* <button 
                  className="w-full bg-transparent text-green-600 py-1 rounded-lg mt-2 hover:text-green-700 transition-colors" 
                  onClick={() => history.push("/dashboard/home/ViewProduct")}
                  >
                    Entrar
                  </button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsMod0alOpen(false)}
        type={modalData.type as any}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
      /> */}
    </IonPage>
  );
};

export default HomePage;
