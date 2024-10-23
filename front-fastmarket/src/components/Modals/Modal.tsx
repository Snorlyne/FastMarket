import React from "react";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "info" | "success" | "warning" | "error"; // Tipos de modal
  title: string;
  message: string;
  onConfirm?: () => void; // Acción opcional en caso de confirmación
}

const Modal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
}) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "text-green-500"; // Color de éxito
      case "warning":
        return "text-yellow-500"; // Color de advertencia
      case "error":
        return "text-red-500"; // Color de error
      default:
        return "text-blue-500"; // Por defecto 'info'
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 z-0 bg-black/20" onClick={onClose}></div>
      <div className={`bg-white rounded-lg z-10 w-screen mx-5 overflow-hidden shadow-lg ${getColor()}`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg text font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times; {/* Icono de cerrar */}
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end p-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="text-black py-2 px-4 rounded hover:text-gray-700"
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
