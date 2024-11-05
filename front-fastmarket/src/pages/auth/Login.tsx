import React, { useState } from 'react';
import {IonPage} from '@ionic/react';
import { useHistory } from "react-router-dom";
import authService from "../../services/AuthService";
import Modal from "../../components/Modals/Modal";
import { useAuth } from "../../services/auth/AuthContext";




const SignUpPage: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAuth();
    const [modalData, setModalData] = useState({
      type: "info",
      title: "",
      message: "",
      onConfirm: () => {},
    });

    const handleLogin = async () => {
        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
          setModalData({
            type: "error",
            title: "Error de Validación",
            message: "Por favor, introduce un correo electrónico válido.",
            onConfirm: () => {
              setIsModalOpen(false);
            },
          });
          setIsModalOpen(true);
          return;
        }
    
        // Validación de la contraseña
        if (password.length < 6) {
          setModalData({
            type: "error",
            title: "Error de Validación",
            message: "La contraseña debe tener al menos 6 caracteres.",
            onConfirm: () => {
              setIsModalOpen(false);
            },
          });
          setIsModalOpen(true);
          return;
        }
    
        const req = {
          correo: email,
          contraseña: password,
        };
    
        setIsLoading(true); // Activar loading
    
        try {
          const response = await authService.login(req.correo, req.contraseña);
          if (response.isSuccess) {
            auth.login(); // Iniciar sesión en el contexto de autenticación
            history.replace('/dashboard/home');
          } else {
            setIsLoading(false); // Detener loading en caso de error
            setModalData({
              type: "error",
              title: "Error de inicio de sesión",
              message: "El email y/o contraseña no coinciden.",
              onConfirm: () => {
                setIsModalOpen(false);
              },
            });
            setIsModalOpen(true);
          }
        } catch (error) {
          setIsLoading(false); // Detener loading en caso de error
          setModalData({
            type: "error",
            title: "Error de inicio de sesión",
            message:
              "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.",
            onConfirm: () => {
              setIsModalOpen(false);
            },
          });
        }finally {
          setIsLoading(false); // Desactivar loading
        }
      };
    
      // Función para manejar el cierre del modal y resetear el estado si es necesario
      const handleModalClose = () => {
        setIsModalOpen(false);
        setIsLoading(false); // Aseguramos que el loading se detenga al cerrar el modal
      };




  return (
    <IonPage>
      <div className="min-h-full bg-gray-900 ">
        {/* Header with improved title styling */}
        <div className="pt-12 px-6">
          <h1 className="text-4xl font-bold text-white  tracking-wide">
            FastMarket
          </h1>
        </div>

        {/* Content moved lower with flex */}
        <div className="px-6 pt-12">
          <p className="text-white mb-8  text-lg">
            Bienvenido a una aplicación de subastas!
          </p>

          <form  className="space-y-6 ">
            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">Correo Electrónico:</label>
              <input
                type="email"
                className="w-full h-12 rounded-xl bg-gray-800 text-white px-4 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                value={email}
              placeholder="Correo Electrónico..."
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">Contraseña:</label>
              <input
                type="password"
               
                className="w-full h-12 rounded-xl bg-gray-800 text-white px-4 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                value={password}
                placeholder="Contraseña..."
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />       
        
            </div>

            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4 relative ${
                isLoading ? 'cursor-not-allowed opacity-70' : ''
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
 <span className={isLoading ? 'invisible' : ''}>
              Iniciar Sesión
            </span>              
              {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[#E8D5FF] text-sm">
              ¿No tienes cuenta?{" "}
              <span
                className={`text-green-500 cursor-pointer hover:underline ${
                  isLoading ? 'pointer-events-none opacity-70' : ''
                }`}
                onClick={() => !isLoading && history.push("/register")}

              >
                Regístrate
              </span>
            </p>
          </div>
        </div>

     
      </div>

        {/* Modal de confirmación con manejo mejorado */}
        <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        type={modalData.type as any}
        title={modalData.title}
        message={modalData.message}
        onConfirm={() => {
          modalData.onConfirm();
          setIsLoading(false); // Aseguramos que el loading se detenga al confirmar
        }}
      />
    </IonPage>
  );
};

export default SignUpPage;