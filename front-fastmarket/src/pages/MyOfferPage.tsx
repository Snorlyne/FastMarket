import { IonPage, IonModal, useIonViewDidEnter } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";
import { IOferta } from "../interfaces/IOferta";
import ofertasService from "../services/OfertasServices";
import { ofertasMockData } from "../data/OfertasMockData";

const MyOffert: React.FC = () => {
  const history = useHistory();
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState<IOferta | null>(null);
  const route = history.location
  const fetchOfertas = async () => {
    try {
      setIsLoading(true);
      const response = await ofertasService.getAllByToken();
      if (response.isSuccess && response.result) {
        setOfertas(response.result);
        console.log("Ofertas obtenidas:", response.result);
      } else {
        console.log("Error al obtener ofertas:", response.message);
      }
    } catch (error) {
      console.error("Error al obtener ofertas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (oferta: IOferta) => {
    setSelectedOferta(oferta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOferta(null);
    setIsModalOpen(false);
  };

  useIonViewDidEnter(() => {
    fetchOfertas();
  });

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed h-screen  inset-0 z-10 flex items-center justify-center ">
          <LoadingWave />
        </div>
      )}
      <div className="min-h-screen bg-slate-900">
        <Header title="Mis Ofertas" />
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h2 className="text-2xl text-white text-center font-medium mb-3">
            Mis ofertas
          </h2>
          <div className="max-w-4xl mx-auto px-4 py-4 overflow-y-auto h-[75vh]">
            <div className="grid grid-cols-1 gap-4 space-y-4">
              {ofertas.length > 0 ? (
                ofertas.map((oferta) => (
                  <div
                    onClick={() => history.push(route.pathname + "/ViewProduct/" + oferta.anuncio.id)}
                    key={oferta.Id}
                    className="flex flex-col bg-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2"
                  >
                    <div className="relative w-full aspect-square">
                      <img
                        src={
                          oferta.anuncio?.productos?.fotos?.[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        className="w-full h-full object-cover bg-gray-900 rounded-2xl"
                        alt={oferta.anuncio?.productos?.nombre || "Producto"}
                      />
                    </div>
                    <div className="p-2 space-y-1">
                      <h3 className="text-xl font-bold text-gray-200">
                        {oferta.anuncio?.productos?.nombre || "Sin nombre"}
                      </h3>
                      <p className="text-gray-300">
                        Monto Ofrecido: $ 
                        <span className="text-green-400 font-bold">
                          {oferta.monto} MXM
                        </span>
                      </p>
                      <button
                        className="w-full bg-blue-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        Ver Detalles del anuncio
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="w-full text-center text-gray-500">
                  No hay ofertas en este momento.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Detalles del Producto */}
        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <h2 className="text-2xl font-bold text-center my-4 px-4">Detalles de los productos ofertados</h2>
          <div className="p-4 flex h-full flex-col justify-between items-center">
            {selectedOferta && selectedOferta.producto && (
              <div className="gap-4 w-full grid grid-cols-2 shrink-0 ">
                {selectedOferta.producto.map((producto) => (
                  <div key={producto.id} className="space-y-2">
                    {/* Imagen del producto */}
                    <div className="relative w-full aspect-square">
                      <img
                        src={
                          producto.fotos?.[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        className="w-full h-full object-cover bg-gray-200"
                        alt={producto.nombre || "Producto"}
                      />
                    </div>

                    {/* Nombre y precio del producto */}
                    <h3 className="text-xl font-bold text-gray-600">
                      {producto.nombre || "Sin nombre"}
                    </h3>
                    <p className="text-lg font-medium text-gray-500">
                      Precio: MX$
                      <span className="text-green-400 font-bold">
                        {selectedOferta.anuncio.precio_anuncio}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
            <button
              className="w-full bg-blue-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </IonModal>
      </div>
    </IonPage>
  );
};

export default MyOffert;
