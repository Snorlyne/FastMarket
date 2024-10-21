import React from "react";
import { useHistory } from "react-router";

const ProfilePage = () => {
  const email = "lian.erick@example.com"; // Ejemplo de correo electrónico
  const phone = "+52 1 234 567 890"; // Ejemplo de número de teléfono
  const history = useHistory();

  return (
    <div className="p-4 bg-white h-screen">
      {/* Sección de avatar y nombre */}
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <h2 className="text-xl font-bold text-gray-800">Lian Erick Aguirre Sierra</h2>
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

      {/* Opciones de navegación */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Opciones:</h3>
        <button
          className="w-full px-4 py-2 mb-2 rounded-lg bg-blue-500 text-white font-semibold"
          onClick={() => history.push("/misVentas")}
        >
          Mis Ventas
        </button>
        <button
          className="w-full px-4 py-2 mb-2 rounded-lg bg-blue-500 text-white font-semibold"
          onClick={() => history.push("/misAnuncios")}
        >
          Mis Anuncios
        </button>
        <button
          className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
          onClick={() => history.push("/misOfertas")}
        >
          Mis Ofertas
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
