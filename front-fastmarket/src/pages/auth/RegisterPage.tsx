import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { IRegistro } from "../../interfaces/IRegister";
import { IResponse } from "../../interfaces/IResponse";
import Modal from "../../components/Modals/Modal";
import { IonPage } from "@ionic/react";

const RegisterPage: React.FC = () => {
  const authService = AuthService;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info", // Por defecto
    title: "",
    message: "",
    onConfirm: () => {}, // Acción por defecto
  }); // Datos dinámicos del modal
  const history = useHistory();

  const handleRegister = async () => {
    // Validación del nombre
    if (!firstName.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El nombre es obligatorio.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    // Validación del apellido
    if (!lastName.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El apellido es obligatorio.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

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

    // Si todas las validaciones son correctas, se crea el objeto request
    const request: IRegistro = {
      correo: email,
      contraseña: password,
      nombre: firstName,
      apellido: lastName,
    };

    try {
      const response: IResponse = await authService.register(request);

      if (response.isSuccess) {
        // Modal de éxito
        setModalData({
          type: "success",
          title: "Registro Exitoso",
          message:
            "Tu cuenta ha sido creada exitosamente. Serás redirigido al inicio de sesión.",
          onConfirm: () => {
            history.push("/login"); // Redirige al login
          },
        });
      } else {
        // Modal de error
        setModalData({
          type: "error",
          title: "Error en el Registro",
          message:
            response.message ||
            "Hubo un problema al crear la cuenta. Inténtalo de nuevo.",
          onConfirm: () => {
            setIsModalOpen(false); // Solo cierra el modal
          },
        });
      }
    } catch (err) {
      // Modal para manejar errores de servidor o de conexión
      setModalData({
        type: "error",
        title: "Error",
        message:
          "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.",
        onConfirm: () => {
          setIsModalOpen(false); // Solo cierra el modal
        },
      });
    } finally {
      setIsModalOpen(true); // Abre el modal después de la respuesta o del error
    }
  };

  return (
    <IonPage className="bg-gray-800 h-screen w-screen flex justify-center items-center">
      <div className="flex justify-center items-center w-11/12">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-green-500 mb-4">
            FastMarket
          </h2>
          <p className="text-center text-gray-600 mb-6">¡Crea tu cuenta!</p>

          {/* Nombre */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={firstName}
              placeholder="Nombre..."
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Apellidos */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={lastName}
              placeholder="Apellidos..."
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={email}
              placeholder="Corre electrónico..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={password}
              placeholder="Contraseña..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón Crear Cuenta */}
          <button
            className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4 relative ${
              isLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            onClick={handleRegister}
            disabled={isLoading}
          >
            <span className={isLoading ? 'invisible' : ''}>
              Crear cuenta
            </span>
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </button>

          <p className="text-center mt-4 text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <span
              className="text-green-500 cursor-pointer hover:underline"
              onClick={() => history.push("/login")}
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalData.type as any}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
      />
    </IonPage>
  );
};

export default RegisterPage;
