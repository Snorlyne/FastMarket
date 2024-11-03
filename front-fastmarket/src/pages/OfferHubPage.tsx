import React, { useEffect, useState } from "react";
import { IonPage, useIonViewDidEnter } from "@ionic/react";
import LoadingWave from "../components/Loader";
import ofertasService from "../services/OfertasServices";
import Header from "../components/Header";

const OffersHubPage: React.FC = () => {
  const [propuestas, setPropuestas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMonto, setNewMonto] = useState<number | "">("");

  const fetchPropuestas = async () => {
    try {
      setIsLoading(true);
      const response = await ofertasService.getAll(); // Fetch all proposals
      if (response.isSuccess && response.result) {
        // Sort proposals by 'monto' in descending order
        const sortedPropuestas = response.result.sort(
          (a: { monto: number }, b: { monto: number }) => b.monto - a.monto
        );
        setPropuestas(sortedPropuestas);
      } else {
        console.log("Error fetching proposals: " + response.message);
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleNewProposal = async () => {
  //     if (newMonto && newMonto > 0) {
  //       try {
  //         const response = await ofertasService.create({ monto: newMonto }); // Send new proposal
  //         if (response.isSuccess) {
  //           setNewMonto(""); // Clear input
  //           fetchPropuestas(); // Refresh list
  //         } else {
  //           console.log("Error submitting proposal: " + response.message);
  //         }
  //       } catch (error) {
  //         console.error("Error submitting proposal:", error);
  //       }
  //     }
  //   };

  useIonViewDidEnter(() => {
    fetchPropuestas();
  });

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
          <LoadingWave />
        </div>
      )}
      <Header title={"Propuestas"} />
      <div className="p-4 bg-white overflow-y-auto">
          <div className="space-y-4 ">
            {propuestas.map((propuesta, index) => (
              <div
                key={propuesta.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg text-black font-semibold">
                    Propuesta #{index + 1}
                  </p>
                  <p className="text-gray-600">Monto: MX${propuesta.monto}</p>
                  <p className="text-gray-600">
                    Usuario: {propuesta.usuarioNombre}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* New Proposal Form */}
        </div>
          <div className="p-4 bg-white sticky border-gray-200">
            <input
              type="number"
              value={newMonto}
              onChange={(e) => setNewMonto(parseFloat(e.target.value))}
              placeholder="Ingrese un monto mayor"
              className="w-full p-2 border text-black bg-white border-gray-300 rounded-md mb-2"
            />
            <button
              // onClick={handleNewProposal}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Enviar nueva propuesta
            </button>
          </div>
    </IonPage>
  );
};

export default OffersHubPage;
