import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import Header from "../components/Header";
import { IonPage } from "@ionic/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
interface ImageData {
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

const ProductForm: React.FC = () => {
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
  
    // Subir imágenes a Firebase Storage y obtener sus URLs
    const uploadImages = images.map(async (image, index) => {
      const imageRef = ref(storage, `productosFM//${image.file.name}-${Date.now()}`);
      await uploadBytes(imageRef, image.file); // Sube la imagen
      return getDownloadURL(imageRef); // Obtén la URL de descarga
    });
  
    try {
      const imageUrls = await Promise.all(uploadImages); // Espera a todas las URLs
  
      // Envía los datos del formulario junto con las URLs de las imágenes
      const formDataWithImages = {
        ...formData,
        images: imageUrls,
      };
  
      console.log("Form submitted:", formDataWithImages);
      // Aquí puedes enviar formDataWithImages a tu backend o hacer lo necesario con los datos
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    }
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
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white placeholder:text-gray-400 text-black"
          />

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

export default ProductForm;
