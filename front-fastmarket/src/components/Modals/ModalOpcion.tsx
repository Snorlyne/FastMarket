import React, { useState } from 'react';
import { useHistory } from "react-router";

import {
  IonButton,
  IonModal,
  IonContent,
} from '@ionic/react';

interface OpcionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OpcionModal({ isOpen, onClose }: OpcionModalProps) {
  const [cantidad, setCantidad] = useState('');
  const history = useHistory();


  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      trigger="open-modal"
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5, 0.75]}
      handleBehavior="cycle"
    >
      <IonContent>
        <div className="flex flex-col items-center p-6 space-y-6 w-full max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-center">
            Enviar propuesta al vendedor
          </h2>

          {/* Contenedor del input y botón */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <input
                type="text"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Agregar monto"
              />
            </div>
          
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Enviar propuesta
            </button>
          </div>

          {/* Botón de producto */}
          <div className="">
            <button 
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              onClick={() => history.push("/dashboard/profile/MyAdvert/ProductCreate")}
            >
              Producto Propuesta
            </button>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
}

export default OpcionModal;