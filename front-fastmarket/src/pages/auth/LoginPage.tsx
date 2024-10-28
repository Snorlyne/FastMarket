import React, { useState } from "react";
import {IonPage} from "@ionic/react";
import { useHistory } from "react-router-dom";

import authService from "../../services/AuthService";
import Modal from "../../components/Modals/Modal";
import { useAuth } from "../../services/auth/AuthContext";

const LoginPage: React.FC = () => {
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
  const history = useHistory();

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
        history.replace('/dashboard');
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
    <IonPage className="bg-gray-800 h-screen w-screen flex items-center justify-center">
      <div className="flex justify-center items-center w-11/12">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-green-500 text-center mb-4">
            FastMarket
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Bienvenido a una aplicación de subastas!
          </p>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border-b-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              value={email}
              placeholder="Correo Electrónico..."
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Input de contraseña */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border-b-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              value={password}
              placeholder="Contraseña..."
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Botón de inicio de sesión con loading spinner mejorado */}
          <button
            className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4 relative ${
              isLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            <span className={isLoading ? 'invisible' : ''}>
              Iniciar Sesión
            </span>
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </button>

          {/* Texto de registro */}
          <p className="text-center mt-4 text-gray-600">
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

export default LoginPage;