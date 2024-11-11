import React, { useEffect, useState } from 'react';
import { trashOutline } from 'ionicons/icons';
import { IonIcon, IonPage } from '@ionic/react';
import perfilService from '../services/PerfilServices';
import { IPersona } from '../interfaces/IPersona';
import { IUsuario } from '../interfaces/IUsuario';
import { useAuth } from '../services/auth/AuthContext';

/* Componentes */
import Header from '../components/Header';
import Modal from '../components/Modals/Modal';

const ProfileView: React.FC = () => {
  const [perfil, setPerfil] = useState<IPersona | null>(null);
  const [email, setEmail] = useState("");
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const fetchPerfil = async () => {
    try {
      const response = await perfilService.getPerfil();
      if (response.isSuccess && response.result) {
        setPerfil(response.result);
        setEmail(response.result.usuarios.correo);
        console.log("Perfil obtenido:", response.result);
      } else {
        console.log("Error fetching perfil: " + response.result);
      }
    } catch (error) {
      console.error("Error fetching perfil:", error);
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
    if (perfil && perfil.id && perfil.idUsuario) { // Asegúrate de tener acceso a `idUsuario`
        // Eliminar el perfil primero
        const responsePerfil = await perfilService.deletePerfil(perfil.id.toString());

        if (responsePerfil.isSuccess) {
            // Si eliminar el perfil fue exitoso, procedemos a eliminar el correo
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
      <div className="min-h-screen w-full bg-white">
        <Header title="Perfil" />
        <div className="w-full h-full overflow-auto p-4">
          {/* Título */}
          <h1 className="text-xl font-bold text-center mb-6">Perfil</h1>
          <div className="bg-gray-300 rounded-lg mb-6">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
              <img
                src={"https://raw.githubusercontent.com/RogelioGR/Proyect-RoomClean/refs/heads/Developer/public/usuario.png"}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Información personal */}
          <div className="bg-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-sm text-gray-600 mb-4">Información personal</h2>
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Nombre:</label>
              <input
                type="text"
                value={perfil?.nombre}
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Apellidos:</label>
              <input
                type="text"
                value={perfil?.apellido}
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">Correo:</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-2 rounded bg-gray-100 text-gray-800"
              />
            </div>
          </div>

          {/* Botón Eliminar cuenta */}
          <button
            onClick={handleDeleteConfirmation}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 rounded-lg text-white hover:bg-red-700 transition-colors"
          >
            <IonIcon icon={trashOutline} className="w-5 h-5" />
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
    </IonPage>
  );
};

export default ProfileView;
