import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { IRegistro } from "../../interfaces/IRegister";
import { IResponse } from "../../interfaces/IResponse";
import Modal from "../../components/Modals/Modal";
import { IonPage } from "@ionic/react";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "info" as "info" | "error" | "success",
    title: "",
    message: "",
    onConfirm: () => {}
  });

  const showModal = (type: "info" | "error" | "success", title: string, message: string, onConfirm?: () => void) => {
    setModalState({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: onConfirm || (() => setModalState(prev => ({ ...prev, isOpen: false })))
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    // Validación del nombre
    if (!formData.firstName.trim()) {
      showModal("error", "Error de Validación", "El nombre es obligatorio.");
      return false;
    }

    // Validación del apellido
    if (!formData.lastName.trim()) {
      showModal("error", "Error de Validación", "El apellido es obligatorio.");
      return false;
    }

    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      showModal("error", "Error de Validación", "Por favor, introduce un correo electrónico válido.");
      return false;
    }

    // Validación de la contraseña
    if (formData.password.length < 6) {
      showModal("error", "Error de Validación", "La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const request: IRegistro = {
        correo: formData.email,
        contraseña: formData.password,
        nombre: formData.firstName,
        apellido: formData.lastName,
      };

      const response: IResponse = await AuthService.register(request);

      if (response.isSuccess) {
        showModal(
          "success",
          "Registro Exitoso",
          "Tu cuenta ha sido creada exitosamente. Serás redirigido al inicio de sesión.",
          () => history.push("/login")
        );
      } else {
        showModal(
          "error",
          "Error en el Registro",
          response.message || "Hubo un problema al crear la cuenta. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      showModal(
        "error",
        "Error",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
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

          {/* Form inputs */}
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={formData.firstName}
              placeholder="Nombre..."
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="lastName"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={formData.lastName}
              placeholder="Apellidos..."
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={formData.email}
              placeholder="Correo electrónico..."
              onChange={handleInputChange}
            />

            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-b-2"
              value={formData.password}
              placeholder="Contraseña..."
              onChange={handleInputChange}
            />
          </div>

          {/* Submit button */}
          <button
            className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-6 relative ${
              isLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            onClick={handleRegister}
            disabled={isLoading}
          >
            <span className={isLoading ? 'invisible' : ''}>
              Crear cuenta
            </span>
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </button>

          <p className="text-center mt-4 text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <span
              className={`text-green-500 cursor-pointer hover:underline ${
                isLoading ? 'pointer-events-none opacity-70' : ''
              }`}
              onClick={() => history.push("/login")}
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
      />
    </IonPage>
  );
};

export default RegisterPage;