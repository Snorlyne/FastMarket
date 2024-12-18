import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { IonPage } from "@ionic/react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import anunciosService from "../services/AnunciosServices";
import LoadingWave from "../components/Loader";
import Inputs from "../components/Inputs";
import Modal from "../components/Modals/Modal";

interface ImageData {
  url: string;
  file: File | null;
}

interface FormData {
  productos: {
    nombre: string;
    descripcion: string;
    precio: string;
    cantidad: string;
    tipo: string;
    fotos: { url: string }[];
    etiquetas: { nombre: string }[];
  };
  localizacion: {
    ciudad: string;
    estado: string;
    pais: string;
    codigoPostal: string;
    latitud: number | null;
    longitud: number | null;
  };
}

const ProductForm: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    productos: {
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad: "",
      tipo: "venta",
      fotos: [{ url: "" }],
      etiquetas: [{ nombre: "" }]
    },
    localizacion: {
      ciudad: "",
      estado: "",
      pais: "",
      codigoPostal: "",
      latitud: 0,
      longitud: 0,
    },
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "info",
    title: "",
    message: "",
    onConfirm: () => { },
  });


  useEffect(() => {
    if (id) {
      setIsLoading(true);
      anunciosService.getById(id).then((product: any) => {
        console.log(product);
        setFormData(product.result);
        setImages(product.result.productos.fotos.map((foto: { url: string }) => ({ url: foto.url, file: null })));
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id]);
  const validateForm = () => {
    // Validar nombre del producto
    if (!formData.productos.nombre.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El nombre del producto es requerido.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    if (!formData.productos.precio || parseFloat(formData.productos.precio) <= 0) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "Por favor, introduce un precio válido",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    // Validar cantidad
    if (!formData.productos.cantidad || parseInt(formData.productos.cantidad) <= 0) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "Por favor, introduce la cantidad del producto.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    // Validar descripción
    if (!formData.productos.descripcion.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "La descripción del producto es requerida.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    // Validar localización
    if (!formData.localizacion.ciudad.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "La ciudad es requerida.",
        onConfirm: () => {
          setIsModalOpen(false);
        },
      });
      setIsModalOpen(true);
      return;
    }

    if (!formData.localizacion.estado.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El estado es requerido.",
       onConfirm: () => {
            setIsModalOpen(false);
          },
        });
        setIsModalOpen(true);
        return;
    }

    if (!formData.localizacion.pais.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El país es requerido.",
       onConfirm: () => {
            setIsModalOpen(false);
          },
        });
        setIsModalOpen(true);
        return;
    }

    // Validar código postal
    if (!formData.localizacion.codigoPostal.trim()) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "El código postal es requerido.",
       onConfirm: () => {
            setIsModalOpen(false);
          },
        });
        setIsModalOpen(true);
        return;
    }

    // Validar imágenes
    if (images.length === 0) {
      setModalData({
        type: "error",
        title: "Error de Validación",
        message: "Debe agregar al menos una imagen del producto.",
        onConfirm: () => setIsModalOpen(false),
      });
      setIsModalOpen(true);
      return ;
    }

    return true;
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prevState: any) => ({
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
      const newFotos = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newFotos]);
    }
  };

  const removeImage = (indexToRemove: number): void => {
    setImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      URL.revokeObjectURL(prev[indexToRemove].url);
      return newImages;
    });
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await anunciosService.delete(id);
      console.log("Producto eliminado con éxito");
      history.replace("/dashboard/profile/MyAdvert");
    } catch (error: any) {
      console.error("Error al eliminar producto:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImagesToFirebase = async (images: ImageData[]) => {
    return await Promise.all(
      images.map(async (image) => {
        if (image.file) {
          const imageRef = ref(storage, `/productosFM/${image.file.name}-${Date.now()}`);
          await uploadBytes(imageRef, image.file);
          return await getDownloadURL(imageRef);
        }
        return image.url;
      })
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const imageUrls = await uploadImagesToFirebase(images);

      const formDataWithImages = {
        ...formData,
        productos: {
          ...formData.productos,
          fotos: imageUrls.map((url) => ({ url })),
        },
      };
      if (!validateForm()) {
        return; 
      }

      if (id) {
        const response = await anunciosService.put(parseInt(id), formDataWithImages);
        if (response.isSuccess) {
          console.log("Producto actualizado con éxito");
          history.replace(`/ViewProduct/${id}`);
        } else {
          console.error("Error al actualizar producto:", response.message);
        }
      } else {
        const response = await anunciosService.post(formDataWithImages);
        if (response.isSuccess) {
          console.log("Producto creado con éxito");
          history.goBack();
        } else {
          console.error("Error al crear producto:", response.message);
        }
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsLoading(false); // Aseguramos que el loading se detenga al cerrar el modal
  };


  return (
    <IonPage>
      {isLoading && (
        <div className="fixed h-screen inset-0 z-10 flex items-center justify-center bg-slate-900">
          <LoadingWave />
        </div>
      )}
      <Header title={id ? "Editar Producto" : "Crear Producto"} />
      <div className="bg-gray-900 p-4 overflow-y-auto h-screen">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          multiple
        />

        {images.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 bg-gray-800 border-2 border-dashed border-gray-950 rounded-lg flex flex-col items-center justify-center space-y-3 hover:bg-gray-800 transition-colors group"
          >
            <div className="text-center">
              <p className="text-gray-400 font-medium">Agregar fotos</p>
              <p className="text-gray-200 text-sm">Haz clic para seleccionar</p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
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
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 bg-gray-800 border border-dashed border-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <PlusCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-white font-medium">Agregar más fotos</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <h3 className="font-medium text-white">Producto</h3>

            <Inputs
              type="text"
              name="productos.nombre"
              placeholder="Nombre del Producto"
              value={formData.productos.nombre}
              onChange={handleChange}
            />
            <Inputs
              type="number"
              name="productos.precio"
              placeholder="Precio del Producto"
              value={formData.productos.precio}
              onChange={handleChange}
            />
            <Inputs
              type="number"
              name="productos.cantidad"
              placeholder="Cantidad del Producto"
              value={formData.productos.cantidad}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="productos.descripcion"
            placeholder="Descripción"
            value={formData.productos.descripcion}
            onChange={handleChange}
            className="w-full h-12 rounded-xl bg-gray-800 text-white px-4 p-2 placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
          />

          <div className="space-y-2">
            <h3 className="font-medium text-white">Localización</h3>
          
            <Inputs
              type="text"
              name="localizacion.ciudad"
              placeholder="Ciudad"
              value={formData.localizacion.ciudad}
              onChange={handleChange}
            />
            <Inputs
              type="text"
              name="localizacion.estado"
              placeholder="Estado"
              value={formData.localizacion.estado}
              onChange={handleChange}
            />
            <Inputs
              type="text"
              name="localizacion.pais"
              placeholder="País"
              value={formData.localizacion.pais}
              onChange={handleChange}
            />
            <Inputs
              type="text"
              name="localizacion.codigoPostal"
              placeholder="Código Postal"
              value={formData.localizacion.codigoPostal}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
          >
            {id ? "Actualizar Producto" : "Crear Producto"}
          </button>

          {id && (
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="w-full p-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors mt-2"
            >
              Eliminar Producto
            </button>
          )}
        </form>
      </div>
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

export default ProductForm;