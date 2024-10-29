import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Header from '../components/Header';
import { useHistory } from "react-router";
import { IonPage } from '@ionic/react';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  status: string;
}

interface ImageData {
  url: string;
  file?: File; // Optional since we may not have a File object for simulated images
}

const EditAdvert: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    status: ''
  });

  // Simulated images
  const initialImages: ImageData[] = [
    { url: 'https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp' },
    { url: 'https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp' },
    { url: 'https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp' }
  ];

  const [images, setImages] = useState<ImageData[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const newImages: ImageData[] = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number): void => {
    setImages(prev => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      // Revoke the object URL if it's a newly uploaded image
      if (prev[indexToRemove].file) {
        URL.revokeObjectURL(prev[indexToRemove].url);
      }
      return newImages;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, images });
  };

  const history = useHistory();

  return (
    <IonPage>
      <div className="bg-gray-100 overflow-x-auto">
        <Header title="Editar Anuncio" />
        <div className='min-h-screen p-4 '>
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />

            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square group">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 border-2 border-dashed border-gray-300 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-8 h-8 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm font-medium">Agregar más</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-gray-600 text-sm">Nombre:</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nombre del producto"
                className="w-full p-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-gray-600 text-sm">Descripción:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Descripción del producto"
                className="w-full p-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] text-black"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="price" className="text-gray-600 text-sm">Precio:</label>
              <input
                id="price"
                type="text"
                name="price"
                placeholder="Precio en dólares"
                className="w-full p-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="status" className="text-gray-600 text-sm">Estado:</label>
              <input
                id="status"
                type="text"
                name="status"
                placeholder="Nuevo o usado"
                className="w-full p-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                value={formData.status}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Editar publicación
            </button>
          </form>
        </div>
      </div>
    </IonPage>
  );
};

export default EditAdvert;
