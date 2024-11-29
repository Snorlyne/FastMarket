import React from "react";
import { InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
        return { icon: <CheckCircleIcon className="h-12 w-12 text-green-500" />, color: "text-green-500" };
      case "warning":
        return { icon: <ExclamationCircleIcon className="h-12 w-12 text-yellow-500" />, color: "text-yellow-500" };
      case "error":
        return { icon: <XCircleIcon className="h-12 w-12 text-red-500" />, color: "text-red-500" };
      default:
        return { icon: <InformationCircleIcon className="h-12 w-12 text-blue-500" />, color: "text-blue-500" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div
      className={`top-0 bottom-0 left-0 right-0 absolute z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className={`relative bg-gray-900 rounded-lg w-full max-w-md p-6 mx-4 text-center shadow-lg`}>
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className={`flex justify-center mb-4 ${color}`}>{icon}</div>

        <h2 className="text-lg text-white font-semibold mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{message}</p>

        {onConfirm && (
          <button
            onClick={onConfirm}
            className={`bg-${color} text-white py-2 px-4 rounded-md hover:bg-${color}800`}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;