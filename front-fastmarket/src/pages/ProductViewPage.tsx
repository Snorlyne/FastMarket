import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import "./css/product.css";
import { IonPage, useIonViewDidEnter } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { IAnuncio } from "../interfaces/IAnuncio";
import anunciosService from "../services/AnunciosServices";
import LoadingWave from "../components/Loader";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anuncio, setAnuncio] = useState<IAnuncio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const fetchAnuncios = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await anunciosService.getById(id);
      if (response.isSuccess && response.result) {
        setAnuncio(response.result);
        console.log("Anuncio fetched:", response.result);
      } else {
        console.log("Error fetching anuncio: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching anuncio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    fetchAnuncios(id);
  });

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      )}
      <div className="view-product-container">
        <Header title={anuncio?.productos?.nombre || "Product Details"} />
        <div className="carousel relative">
          <div className="relative overflow-x-scroll">
            <div className="flex">
              {anuncio?.productos?.fotos?.map((foto, index) => (
                <div
                  key={index}
                  className="w-full p-2 h-80 bg-gray-300 flex-shrink-0"
                >
                  <img
                    className="w-full h-full rounded-md object-contain"
                    src={foto.url} // Display each product photo
                    alt={`Product image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h1 className="text-xl font-bold text-black">
            {anuncio?.productos?.nombre || "Product Name"}
          </h1>
          <p className="text-green-600">
            MX${anuncio?.productos?.precio || "N/A"}
          </p>

          <div className="my-4">
            <h2 className="text-md font-semibold text-black">
              Mejores Ofertas:
            </h2>
            <div className="flex space-x-2 mt-2">
              {anuncio?.ofertas?.map((oferta: any, index: any) => (
                <button
                  key={index}
                  className="bg-green-600 py-2 px-4 rounded-lg"
                >
                  {index + 1}. Oferta: ${oferta.monto}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
            Enviar propuesta al vendedor
          </button>

          <div className="mt-6">
            <h3 className="text-md font-semibold">Descripción:</h3>
            <p className="text-gray-600 text-justify">
              {anuncio?.descripcion || "No description available."}
            </p>
            <p className="text-black mt-2">
              Estado: {anuncio?.estado || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default ViewProduct;
