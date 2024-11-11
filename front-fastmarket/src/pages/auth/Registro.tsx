import React, { useState } from 'react';
import {IonPage} from '@ionic/react';
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { IRegistro } from "../../interfaces/IRegister";
import { IResponse } from "../../interfaces/IResponse";
import Modal from "../../components/Modals/Modal";
import Inputs from '../../Components2/Inputs';





const RegisterPage: React.FC = () => {
    const history = useHistory();
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
          <p className="text-white mb-4  text-lg">
            Crea tu cuenta!
          </p>

          <form  className="space-y-6">
       
            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">Nombre:</label>
            
                <Inputs
                type="text"
                name="firstName"
                onChange={handleInputChange}
                value={formData.firstName}
                placeholder="Nombre..."
                />
            </div>

            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">Apellido:</label>
         
                 <Inputs
                type="text"
                name="lastName"
                onChange={handleInputChange}
                value={formData.lastName}
                placeholder="Apellidos..."
                />
            </div>
            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">correo electrónico:</label>
          
               <Inputs
                 type="email"
                 name="email"
                 placeholder="Correo electrónico..."
                 onChange={handleInputChange}
                 value={formData.email}
                />
            </div>

            <div className="space-y-2">
              <label className="text-[#E8D5FF] text-sm">Contraseña:</label>
          
               <Inputs
               type="password"
               name="password"
               value={formData.password}
               placeholder="Contraseña..."
               onChange={handleInputChange}
                />
            </div>

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
          </form>

          <div className="text-center mt-8">
            <p className="text-[#E8D5FF] text-sm">
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