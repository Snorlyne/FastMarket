import React, { useState } from "react";
import { useIonViewDidEnter } from "@ionic/react";
import anunciosService from "../../services/AnunciosServices";
import { IProducto } from "../../interfaces/IProducto";
import { IonIcon, IonPage } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useEffect } from "react";
import { IonCard, IonCardHeader, IonCardContent, IonButton } from '@ionic/react';
import LoadingWave from "../../components/Loader";
import { useHistory } from "react-router";


const HomePage: React.FC = () => {
  const [anuncios, setAnuncios] = useState<any[]>([]); // Assuming 'any' for simplicity, replace with the actual type
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAnuncios = async () => {
    try {
      const response = await anunciosService.getAll();
      if (response.isSuccess && response.result) {
        setAnuncios(response.result); // Set the anuncios state
        console.log("Anuncios obtenidos:", response.result); // Log the fetched anuncios for debugging purposes
      } else {
        alert("Error fetching anuncios: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching anuncios:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    fetchAnuncios();
  });


  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <LoadingWave />
      </div>
    );
  }

  return (
    <IonPage>
      <div className="p-4 h-screen bg-white">
        <h2 className="text-2xl text-black text-center font-bold mb-1">Subasta de productos</h2>
        <p className="text-md text-black text-center mb-4">Encuentra tus productos</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anuncios.map((anuncio, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold">{anuncio.descripcion}</h3>
              <p className="text-gray-600">MX${anuncio.precio_anuncio}</p>
              
              {/* Map over products within each anuncio */}
                <div>
                  <p className="text-gray-600">Producto: {anuncio.productos.nombre}</p> 

                  {/* Display product images */}
                  {anuncio.productos.fotos.length > 0 && (
                    <img src={anuncio.productos.fotos[0].url} alt={anuncio.productos.nombre} className="w-full h-32 object-cover" />
                  )}
                </div>

              <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 hover:bg-green-600 transition-colors">
                Entrar
              </button>
            </div>
          ))}
        </div>
      </div>
    </IonPage>
  );
};

export default HomePage;