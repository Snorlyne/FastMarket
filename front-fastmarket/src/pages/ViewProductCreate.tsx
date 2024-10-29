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
  file: File;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    status: ''
  });
  
  const [images, setImages] = useState<ImageData[]>([]);
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
      URL.revokeObjectURL(prev[indexToRemove].url);
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
    <div className=" bg-gray-100">
        <Header title="Crear Anuncio" />

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
        
        {images.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center space-y-3 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-8 h-8 text-gray-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

            </div>
            <div className="text-center">
              <p className="text-gray-600 font-medium ">Agregar fotos</p>
              <p className="text-gray-400 text-sm">Haz clic para seleccionar</p>
            </div>
          </button>
        ) : (
          // Grid of Images with Add Button
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
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5 h-5" >
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
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
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

        {/* Description Input */}
        <div className="space-y-1">
          <label htmlFor="description" className="text-gray-600 text-sm">Descripción:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción del producto"
            className="w-full p-2 border  bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] text-black"

            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Price Input */}
        <div className="space-y-1">
          <label htmlFor="price" className="text-gray-600 text-sm">Precio:</label>
          <input
            id="price"
            type="text"
            name="price"
            placeholder="$10,000"
            className="w-full p-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* Status Input */}
        <div className="space-y-1">
          <label htmlFor="status" className="text-gray-600 text-sm">Estado:</label>
          <input
            id="status"
            type="text"
            name="status"
            placeholder="El estado del producto"
            className="w-full p-2 border bg-white  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.status}
            onChange={handleChange}
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
     
    </div>
    </IonPage>
  );
};

export default ProductForm;