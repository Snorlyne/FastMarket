import React, { useEffect, useState } from "react";
import { IonPage, useIonViewDidEnter } from "@ionic/react";
import LoadingWave from "../components/Loader";
import ofertasService from "../services/OfertasServices";
import Header from "../components/Header";
import { useParams } from "react-router";
import { ICreateOferta } from "../interfaces/IOferta";
import authService from "../services/AuthService";
import { EstadoOferta } from "../enums/EstadoOferta";
import { useHistory } from "react-router";
interface ViewParams {
  id: string;
}

const OffersHubPage: React.FC = () => {
  const { id } = useParams<ViewParams>();
  const [propuestas, setPropuestas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMonto, setNewMonto] = useState<number | "">("");
  const [propetario, setPropetario] = useState<boolean>(false);
  const idUser = authService.getId();
  const [propietarioOferta, setPropietarioOferta] = useState<number | null>();
  const [ofertaAlta, setOfertaAlta] = useState<number | undefined>();
  const history = useHistory();

  const fetchPropuestas = async () => {
    if (!id) return;
    if (!idUser) return;
    try {
      setIsLoading(true);
      const response = await ofertasService.getAllByAnuncio(id); // Fetch all proposals
      if (response.isSuccess) {
        console.log(response.result)
        // Sort proposals by 'monto' in descending order
        const sortedPropuestas = response.result.ofertas.sort(
          (a: { monto: number }, b: { monto: number }) => b.monto - a.monto
        );

        setPropuestas(sortedPropuestas);
        setPropetario(response.result.isPropetario);

        if (sortedPropuestas[0] != undefined) { setOfertaAlta(sortedPropuestas[0].id); }
        console.log(ofertaAlta);
        const userProposal = sortedPropuestas.find(
          async (propuesta: { idPersona: string | null }) => propuesta.idPersona === await idUser
        );
        if (userProposal) {
          setPropietarioOferta(userProposal.id);
        }

        console.log(userProposal);

      } else {
        console.log("Error fetching proposals: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useIonViewDidEnter(() => {
    fetchPropuestas();
  });

  const handleNewProposal = async () => {
    if (newMonto && newMonto > 0) {
      const req: ICreateOferta = {
        oferta: {
          monto: newMonto,
          tipo: "dinero",
        },
        productos: []
      }
      setIsLoading(true);
      try {
        const response = await ofertasService.postOferta(id, req); // Send new proposal
        if (response.isSuccess) {
          setNewMonto(""); // Clear input
          fetchPropuestas() // Refresh list
        } else {
          console.log("Error submitting proposal: " + response.message);
        }
      } catch (error) {
        console.error("Error submitting proposal:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  async function handleAceptarOferta(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await ofertasService.putEstadoOferta(ofertaAlta!, EstadoOferta.Aceptada);
      if (response.isSuccess) {
        console.log("Oferta aceptada con éxito:", response.result);
        history.replace(`/chatlist/chat/${ofertaAlta}`);
      } else {
        console.error("Error al aceptar la oferta:", response.message);
      }

    } catch (error) {
      console.error("Error inesperado al aceptar la oferta:", error);
    } finally {
      setIsLoading(false);
    }

    console.log("Oferta aceptada con ID: " + ofertaAlta);
  }

  async function handleCancelarOferta(id: number): Promise<void> {
    setIsLoading(true);
    try {
      const response = await ofertasService.putEstadoOferta(id, EstadoOferta.Cancelada);
      if (response.isSuccess) {
        console.log("Oferta cancelada con éxito:", response.result);
        fetchPropuestas(); // Refresh list
        setPropietarioOferta(null);
      } else {
        console.error("Error al cancelar la oferta:", response.message);
      }
    } catch (error) {
      console.error("Error inesperado al cancelar la oferta:", error);
    }
  }

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      )}
      <Header title={"Propuestas"} />
      <div className="h-[95%] flex justify-between flex-col">
        <div className="p-4  bg-white overflow-y-auto">
          <div className="space-y-4">
            {propuestas.map((propuesta, index) => (
              <div
                key={propuesta.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-start"
              >
                <div>
                  <p className="text-lg text-black font-semibold">
                    Propuesta #{index + 1}
                  </p>
                  <p className="text-gray-600">Monto: MX${propuesta.monto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* New Proposal Form */}
        {!propetario ? (
          <div className="p-4 bg-white  border-t border-gray-200">
            <div className="flex justify-between items-center space-x-2 mb-2">
              <input
                type="number"
                value={newMonto}
                onChange={(e) => setNewMonto(parseFloat(e.target.value))}
                placeholder="Ingrese un monto mayor"
                className="w-full p-2 border text-black bg-white border-gray-300 rounded-md"
              />
              <button
                onClick={handleNewProposal}
                className="w-4/12 bg-blue-500 text-white py-2 rounded-lg"
              >
                Ofertar
              </button>
            </div>
            {propietarioOferta != null && (
              <button
                onClick={() => handleCancelarOferta(propietarioOferta)}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Cancelar oferta
              </button>
            )}
          </div>
        ) :
          <div className="p-4">
            <button
              onClick={handleAceptarOferta}
              disabled={!ofertaAlta}
              className={`w-full py-2 rounded-lg  font-semibold transition-colors ${ofertaAlta ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 cursor-not-allowed text-gray-600'}
                }`}
              aria-disabled={!ofertaAlta}
            >
              {ofertaAlta ? 'Aceptar oferta' : 'Ofertas no disponibles'}
            </button>
          </div>
        }
      </div>
    </IonPage>
  );
};

export default OffersHubPage;
