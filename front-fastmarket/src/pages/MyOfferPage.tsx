import { IonPage, IonModal, useIonViewDidEnter } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useState } from "react";
import LoadingWave from "../components/Loader";
import { IOferta } from "../interfaces/IOferta";
import ofertasService from "../services/OfertasServices";

const MyOffert: React.FC = () => {
  const history = useHistory();
  const route = history.location;
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState<IOferta | null>(null);

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
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-900">
          <LoadingWave />
        </div>
      )}
      <div className="min-h-screen bg-slate-900">
        <Header title="Mis Ofertas" />
        <h2 className="text-lg font-semibold text-gray-200 px-4 mb-4">Mis Ofertas</h2>

        {/* Lista de ofertas */}
        <div className="px-4 pb-4 overflow-y-auto h-[calc(100vh-180px)]">
          <div className="grid grid-cols-2 gap-3">
            {ofertas.length > 0 ? (
              ofertas.map((oferta) => (
                <div
                  key={oferta.Id}
                  className="flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-green-500 transition-all duration-300 shadow-xl"
                  onClick={() => history.push(route.pathname + "/ViewProduct/" + oferta.anuncio.id)}
                >
                  <div className="relative w-full aspect-square">
                    <img
                      src={
                        oferta.anuncio?.productos?.fotos?.[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      className="w-full h-full object-cover bg-slate-800"
                      alt={oferta.anuncio?.productos?.nombre || "Producto"}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                      {oferta.anuncio?.productos?.nombre || "Sin nombre"}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-400 text-sm">MX$</span>
                      <span className="text-green-400 text-lg font-bold">
                        {oferta.monto}
                      </span>
                    </div>
                    <button
                      className="w-full bg-slate-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-700 hover:border-indigo-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(route.pathname + "/ViewProduct/" + oferta.anuncio.id);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center h-48 text-slate-400">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mb-3 text-slate-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>

                <p className="text-center font-medium">
                  No hay ofertas en este momento.
                </p>
                <p className="text-sm text-slate-500">
                  Explora los anuncios disponibles para hacer tu primera oferta
                </p>
              </div>
            )}
          </div>
        </div>

        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <div className="bg-slate-900 p-4 min-h-full">

            <div className="p-4 flex flex-col space-y-4">
              {selectedOferta && selectedOferta.producto && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedOferta.producto.map((producto) => (
                    <div
                      key={producto.id}
                      className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
                    >
                      <div className="relative w-full aspect-square">
                        <img
                          src={
                            producto.fotos?.[0]?.url ||
                            "https://via.placeholder.com/150"
                          }
                          className="w-full h-full object-cover"
                          alt={producto.nombre || "Producto"}
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          {producto.nombre || "Sin nombre"}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-slate-400 text-sm">MX$</span>
                          <span className="text-green-400 text-lg font-bold">
                            {selectedOferta.anuncio.precio_anuncio}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="w-full bg-slate-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-slate-700 hover:border-indigo-500"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </IonModal>
      </div>
    </IonPage>
  );
};

export default MyOffert;