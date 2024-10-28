import React from "react";
import { InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  onConfirm?: () => void;
}

const Modal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return { icon: <CheckCircleIcon className="h-16 w-16" />, color: "text-green-" };
      case "warning":
        return { icon: <ExclamationCircleIcon className="h-16 w-16" />, color: "text-yellow-" };
      case "error":
        return { icon: <XCircleIcon className="h-16 w-16" />, color: "text-red-" };
      default:
        return { icon: <InformationCircleIcon className="h-16 w-16"/>, color: "text-blue-" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center`}>
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className={`relative bg-white rounded-lg w-full max-w-md p-6 mx-4 text-center shadow-lg`}>
        
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <div className={`flex justify-center mb-4 ${color}500`}>
          {icon}
        </div>
        
        <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        
        {onConfirm && (
          <button
            onClick={onConfirm}
            className={` ${color}500 py-2 px-4 rounded-md hover:${color}800`}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
