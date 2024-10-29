import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import Header from "../components/Header";
import { IonPage } from "@ionic/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { storage } from "../firebaseConfig";
/* import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
 */interface ImageData {
  url: string;
  file: File;
}

interface FormData {
  [key: string]: any; // Permite acceder a propiedades mediante índices dinámicos
  descripcion: string;
  tipo: string;
  productos: {
    nombre: string;
    precio: string;
    cantidad: string;
    tipo: string;
  };
  localizacion: {
    ciudad: string;
    estado: string;
    pais: string;
    codigoPostal: string;
    latitud: string;
    longitud: string;
  };
}

const ProductCreate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    descripcion: "",
    tipo: "",
    productos: {
      nombre: "",
      precio: "",
      cantidad: "",
      tipo: "",
    },
    localizacion: {
      ciudad: "",
      estado: "",
      pais: "",
      codigoPostal: "",
      latitud: "",
      longitud: "",
    },
  });

  const [images, setImages] = useState<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const newImages: ImageData[] = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number): void => {
    setImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      URL.revokeObjectURL(prev[indexToRemove].url);
      return newImages;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, images });
  };

  return (
    <IonPage>
      <Header title="Crear Anuncio" />
      <div className="bg-gray-100 p-4 overflow-y-auto">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />

        {images.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center space-y-3 hover:bg-gray-50 transition-colors group"
          >
            <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg>


              <p className="text-gray-600 font-medium">Agregar fotos</p>
              <p className="text-gray-400 text-sm">Haz clic para seleccionar</p>
            </div>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square group">
                <img
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <XCircleIcon
                  className="absolute top-2 right-2 w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
          /> */}
         

          <div className="space-y-2">
            <h3 className="font-medium text-black">Productos</h3>
            <input
              type="text"
              name="productos.nombre"
              placeholder="Nombre del Productos"
              value={formData.productos.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
            <input
              type="number"
              name="productos.precio"
              placeholder="Precio del Productos"
              value={formData.productos.precio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
            <input
              type="number"
              name="productos.cantidad"
              placeholder="Cantidad del Productos"
              value={formData.productos.cantidad}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
          </div>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
          />

          <div className="space-y-2">
            <h3 className="font-medium text-black">Localización</h3>
            <input
              type="text"
              name="localizacion.ciudad"
              placeholder="Ciudad"
              value={formData.localizacion.ciudad}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
            <input
              type="text"
              name="localizacion.estado"
              placeholder="Estado"
              value={formData.localizacion.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
            <input
              type="text"
              name="localizacion.pais"
              placeholder="País"
              value={formData.localizacion.pais}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
            <input
              type="text"
              name="localizacion.codigoPostal"
              placeholder="Código Postal"
              value={formData.localizacion.codigoPostal}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Crear publicación
          </button>
        </form>
      </div>
    </IonPage>
  );
};

export default ProductCreate;
