import React, { useEffect, useState } from 'react';
import { trashOutline, personCircleOutline, mailOutline, personOutline } from 'ionicons/icons';
import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/react';
import perfilService from '../services/PerfilServices';
import { IPersona } from '../interfaces/IPersona';
import { useAuth } from '../services/auth/AuthContext';


/* Componentes */
import Modal from '../components/Modals/Modal';
import Inputs from '../components/Inputs';
import Header from '../components/Header';
import LoadingWave from "../components/Loader";


const ProfileView: React.FC = () => {
  const [perfil, setPerfil] = useState<IPersona | null>(null);
  const [email, setEmail] = useState("");
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: () => { },
  });

  const fetchPerfil = async () => {
    try {
      setIsLoading(true);
      const response = await perfilService.getPerfil();
      if (response.isSuccess && response.result) {
        setPerfil(response.result);
        setEmail(response.result.usuarios.correo);
      }
    } catch (error) {
      console.error("Error fetching perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
    setModalData({
      type: "warning",
      title: "Eliminar cuenta",
      message: "¿Estás seguro de eliminar tu cuenta?",
      onConfirm: confirmDeleteUser,
    });
  };

  const confirmDeleteUser = async () => {
    if (perfil && perfil.id && perfil.idUsuario) {
      const responsePerfil = await perfilService.deletePerfil(perfil.id.toString());

      if (responsePerfil.isSuccess) {
        const responseCorreo = await perfilService.deleteCorreo(perfil.idUsuario.toString());

        if (responseCorreo.isSuccess) {
          console.log(responseCorreo.message);
          setIsModalOpen(false);
          await auth.logout();
        } else {
          console.error(responseCorreo.message);
        }
      } else {
        console.error(responsePerfil.message);
      }
    }
  };

  return (
    <IonPage>
       {isLoading && (
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-900">
          <LoadingWave />
        </div>
      )}
      <Header title="Perfil" />
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center w-full h-full">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full border-4 border-gray-700 mb-4 overflow-hidden">
            <img
              src={"https://raw.githubusercontent.com/RogelioGR/Proyect-RoomClean/refs/heads/Developer/public/usuario.png"}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Name */}
          <h2 className="text-xl font-bold text-white mb-6">
            {perfil?.nombre} {perfil?.apellido}
          </h2>

          {/* Profile Details */}
          <div className="w-full space-y-4">
            {/* Nombre */}
            <div className="bg-gray-800 rounded-lg p-3 flex items-center">
              <IonIcon icon={personOutline} className="text-blue-400 mr-4 text-2xl" />
              <div className="flex-1">
                <label className="text-xs text-gray-400 block">Nombre</label>
                <Inputs
                  type="text"
                  value={perfil?.nombre}
                  readOnly
                  className="bg-transparent text-white w-full"
                />
              </div>
            </div>

            {/* Apellidos */}
            <div className="bg-gray-800 rounded-lg p-3 flex items-center">
              <IonIcon icon={personCircleOutline} className="text-green-400 mr-4 text-2xl" />
              <div className="flex-1">
                <label className="text-xs text-gray-400 block">Apellidos</label>
                <Inputs
                  type="text"
                  value={perfil?.apellido}
                  readOnly
                  className="bg-transparent text-white w-full"
                />
              </div>
            </div>

            {/* Correo */}
            <div className="bg-gray-800 rounded-lg p-3 flex items-center">
              <IonIcon icon={mailOutline} className="text-purple-400 mr-4 text-2xl" />
              <div className="flex-1">
                <label className="text-xs text-gray-400 block">Correo</label>
                <Inputs
                  type="email"
                  value={email}
                  readOnly
                  className="bg-transparent text-white w-full"
                />
              </div>
            </div>
          </div>

          {/* Delete Account Button */}
          <div className="w-full mt-6">
            <button
              onClick={handleDeleteConfirmation}
              className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors"
            >
              <IonIcon icon={trashOutline} className="text-xl" />
              <span>Eliminar cuenta</span>
            </button>
          </div>
        </div>

        {/* Modal de confirmación */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={"warning"}
          title={modalData.title}
          message={modalData.message}
          onConfirm={modalData.onConfirm}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfileView;