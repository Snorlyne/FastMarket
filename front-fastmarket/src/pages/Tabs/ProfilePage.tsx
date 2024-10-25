import { IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import LoadingWave from "../../components/Loader";
import authService from "../../services/AuthService";
import { useAuth } from "../../services/auth/AuthContext";

const ProfilePage: React.FC = () => {
  const email = "lian.erick@example.com";
  const history = useHistory();
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [isLoading, setIsLoading] = useState(true);

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

  const logOut = async () => {
    setIsModalOpen(true);
    setModalData({
      type: "info",
      title: "¿Cerrar Sesión?",
      message: "Estás a punto de cerrar tu sesión. ¿Estás seguro?",
      onConfirm: () => auth.logout(),
    });
  };

  return (
    <IonPage>
      <div className="p-4 bg-white h-screen">
        {/* Sección de avatar y nombre */}
        <IonCard
          className="bg-white shadow-lg rounded-lg max-w-sm"
          onClick={() => history.push("/ViewProfile")}
        >
          <IonCardHeader>
            <div className="flex items-center p-6">
              <img
                src="https://raw.githubusercontent.com/RogelioGR/Proyect-RoomClean/refs/heads/Developer/public/usuario.png"
                alt="Avatar"
                className="w-16 h-16 rounded-full mr-6"
              />
              <IonCardTitle className="text-xl font-bold text-gray-800">
                Lian Erick Aguirre Sierra
              </IonCardTitle>
            </div>
            {/* Input para Correo Electrónico */}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                readOnly
                className="w-full px-4 py-2 rounded-lg text-gray-700 bg-gray-200 border-b-2"
                value={email}
                placeholder="Correo Electrónico..."
              />
            </div>
          </IonCardHeader>
        </IonCard>

        {/* Opciones de navegación */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-black">Opciones:</h3>

          <div className="grid grid-cols-2 gap-2 place-items-center mx-auto">
            <IonCard className="w-44 rounded-xl">
              <IonCardHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
                <IonCardTitle>Mis ventas</IonCardTitle>
              </IonCardHeader>
            </IonCard>

            <IonCard className="w-44 rounded-xl">
              <IonCardHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
                <IonCardTitle>Mis Anuncios</IonCardTitle>
              </IonCardHeader>
            </IonCard>

            <IonCard className="w-44 rounded-xl">
              <IonCardHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <IonCardTitle>Mis Ofertas</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex justify-center"
            onClick={() => authService.logout().then(() => logOut())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </IonPage>
  );
};

export default ProfilePage;
