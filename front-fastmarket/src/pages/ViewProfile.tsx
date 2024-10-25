import React from 'react';
import { trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import Header from '../components/Header';

const ViewProfile: React.FC = () => {
  return (
    
    <div className="min-h-screen w-full bg-white">
            <Header title="perfil" />

      
      <div className="w-full h-full overflow-auto p-4">
        {/* Container principal con fondo gris claro */}
          {/* Título */}
          <h1 className="text-xl font-bold text-center mb-6">Perfil</h1>

          {/* Contenedor de la imagen de perfil */}
          <div className="bg-gray-300 rounded-lg p-4 mb-6">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
              <img
                src={"https://raw.githubusercontent.com/RogelioGR/Proyect-RoomClean/refs/heads/Developer/public/usuario.png"}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sección de información personal */}
          <div className="bg-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-sm text-gray-600 mb-4">Información personal</h2>
            
            {/* Campo Nombre */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Nombre:</label>
              <input
                type="text"
                value='Lian'
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>

            {/* Campo Apellidos */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Apellidos:</label>
              <input
                type="text"
                value='{userData.apellidos}'
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>

            {/* Campo Correo */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Correo:</label>
              <input
                type="email"
                value='lina'
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>

            {/* Campo Número */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Numero:</label>
              <input
                type="tel"
                value='s'
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>
          </div>

          {/* Botón Eliminar cuenta */}
          <button
            // onClick={onDeleteAccount}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 rounded-lg text-white hover:bg-red-700 transition-colors"
          >
            <IonIcon icon={trashOutline} className="w-5 h-5" />
            <span>Eliminar cuenta</span>
          </button>
        </div>
      </div>
  );
};

export default ViewProfile;