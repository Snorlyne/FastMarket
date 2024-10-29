import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";
import { IonPage, IonCard } from "@ionic/react";

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

        {/* Lista de productos desplazable */}
        <div className="container mx-auto p-2">
  <div className="flex flex-col">
  <IonCard className="p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="flex">
        <div className="w-24 h-24">
          <img
             src={ "https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"} 
            alt="Silla de escritorio"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">Silla de escritorio</h2>
            <p className="text-gray-600">MX$600</p>
          </div>

          <div className="flex flex-col w-full">
            <button  
          className=" px-10 bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors"
          onClick={() => history.push("/misAnuncios/publicarAnuncio/EditAnuncio")}

            >
              Editar Publicación
            </button>
            <button 
            className=" px-10 bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors"
            >
              Eliminar Publicación
            </button>
          </div>
        </div>
      </div>
    </IonCard>
    <IonCard className="p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="flex">
        <div className="w-24 h-24">
          <img
             src={ "https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"} 
            alt="Silla de escritorio"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">Silla de escritorio</h2>
            <p className="text-gray-600">MX$600</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col w-full">
            <button  
          className=" px-10 bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600 transition-colors"


            >
              Editar Publicación
            </button>
            <button 
            className=" px-10 bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors"
            >
              Eliminar Publicación
            </button>
          </div>
        </div>
      </div>
    </IonCard>
    
    
  </div>
</div>
      
      </div>
    </IonPage>
  );
};

export default ViewMyAnuncio;
