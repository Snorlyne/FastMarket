import { IonPage, useIonViewDidEnter } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import LoadingWave from "../../components/Loader";
import authService from "../../services/AuthService";
import { useAuth } from "../../services/auth/AuthContext";
import perfilService from "../../services/PerfilServices";
import { IPersona } from "../../interfaces/IPersona";
import Modal from "../../components/Modals/Modal";
import HeaderHome from "../../components/Header copy";




const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const auth = useAuth();
  const [perfil, setPerfil] = useState<IPersona | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: () => { },
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPerfil = async () => {
    try {
      setIsLoading(true);
      const response = await perfilService.getPerfil();
      if (response.isSuccess && response.result) {
        setPerfil(response.result);
        setEmail(response.result.usuarios.correo);
        console.log("Perfil obtenidos:", response.result);
      } else {
        console.log("Error fetching perfil: " + response.result);
      }
    } catch (error) {
      console.error("Error fetching perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    fetchPerfil();
  });

  const logOut = async () => {
    setIsModalOpen(true);
    setModalData({
      type: "warning",
      title: "¿Cerrar Sesión?",
      message: "Estás a punto de cerrar tu sesión. ¿Estás seguro?",
      onConfirm: () => auth.logout(),
    });
  };

  return (
    <IonPage>
      {isLoading && (
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-950">
          <LoadingWave />
        </div>
      )}
      <HeaderHome title="FastMarket" />
      <div className="p-4 bg-slate-900 min-h-screen">
        <div className="bg-slate-800 shadow-xl rounded-xl max-w-sm mx-auto border border-slate-800 hover:border-slate-700 transition-all duration-300" onClick={() => history.push("/dashboard/profile/Profile")}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img
                src="https://raw.githubusercontent.com/RogelioGR/Proyect-RoomClean/refs/heads/Developer/public/usuario.png"
                alt="Avatar"
                className="w-16 h-16 rounded-full mr-6 border-2 border-green-500"
              />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {perfil?.nombre} {perfil?.apellido}
                </h2>
                <p className="text-green-400 text-sm">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de opciones */}
        <div className="mt-8 mb-20">
          <h3 className="text-lg font-semibold mb-4 text-white px-2">Opciones:</h3>
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <button
              onClick={() => history.push('/dashboard/profile/Mysale')}
              className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl border border-slate-900 hover:border-green-500 hover:bg-slate-950 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-400 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
              <span className="text-white text-sm font-medium">Mis ventas</span>
            </button>
            <button
              onClick={() => history.push("/dashboard/profile/MyBuys")}
              className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl border border-slate-950 hover:border-green-500 hover:bg-slate-900 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-400 mb-2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              <span className="text-white text-sm font-medium">Mis Compras</span>
            </button>

            <button
              onClick={() => history.push("/dashboard/profile/MyAdvert")}
              className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl border border-slate-900 hover:border-green-500 hover:bg-slate-950 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-400 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
              <span className="text-white text-sm font-medium">Mis Anuncios</span>
            </button>

            <button
              onClick={() => history.push("/dashboard/profile/MyOffert")}
              className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl border border-slate-950 hover:border-green-500 hover:bg-slate-900 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-400 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-white text-sm font-medium">Mis Ofertas</span>
            </button>

          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="fixed bottom-4 left-4 right-4">
          <button
            className="w-full bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition-colors duration-300 flex justify-center items-center gap-2 font-medium"
            onClick={() => authService.logout().then(() => logOut())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="warning"
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
      />
    </IonPage>
  );
};

export default ProfilePage;