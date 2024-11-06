import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonLabel, IonButton, IonLoading, IonAlert } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core'; // Si es necesario importar este tipo
import { IonInputCustomEvent } from '@ionic/core';
import { IFoto } from '../interfaces/IFoto'; // Asegúrate de importar la interfaz IFoto
import { IAnuncio } from '../interfaces/IAnuncio'; // Asegúrate de importar la interfaz IAnuncio
import anunciosService from '../services/AnunciosServices';
const CrearAnuncioPage: React.FC = () => {
  const [descripcion, setDescripcion] = useState<string>(''); // Descripción del anuncio
  const [precio, setPrecio] = useState<number>(0); // Precio del anuncio
  const [fotos, setFotos] = useState<IFoto[]>([]); // Fotos del anuncio
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [showAlert, setShowAlert] = useState<boolean>(false); // Estado de alerta

// Manejador de cambio para el campo de texto 'descripcion'
const handleDescripcionChange = (event: IonInputCustomEvent<any>) => {
  setDescripcion(event.detail.value!); // Obtén el valor del evento y actualiza el estado
};

// Manejador de cambio para el campo 'precio'
const handlePrecioChange = (event: IonInputCustomEvent<any>) => {
  setPrecio(Number(event.detail.value!)); // Convierte el valor a número y actualiza el estado
};


  // Manejador de cambio para el campo 'fotos' (subida de imágenes)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFotos: IFoto[] = Array.from(files).map((file, index) => ({
        id: index, // Asignamos un ID temporal basado en el índice
        url: URL.createObjectURL(file), // Usamos la URL del archivo para la imagen
      }));
      setFotos(newFotos); // Establecer el estado de las fotos
    }
  };

  // Manejador para enviar el formulario y crear el anuncio
  const handleCreateAnuncio = async () => {
    setLoading(true);
    try {
      const nuevoAnuncio: IAnuncio = {
        id: 0, // ID temporal
        estado: 'activo',
        fecha_publicacion: new Date(),
        fecha_expiracion: new Date(), // Puedes ajustar la fecha de expiración según lo necesites
        precio_anuncio: precio,
        descripcion: descripcion,
        tipo: 'venta', // Ajusta el tipo según lo necesites
        productos: { // Aquí puedes agregar un producto vacío si lo necesitas
          id: 0,
          nombre: 'Producto de ejemplo',
          descripcion: 'Descripción del producto',
          precio: precio,
          cantidad: 1,
          tipo: 'fisico',
          fotos: fotos, // Agregamos las fotos al producto
          etiquetas: [{id:0,  nombre: 'Etiqueta1' }] // Puedes agregar etiquetas aquí
        },
        localizacion: { // Definir la localización (puedes ajustarlo según lo necesites)
          id: 1,
          ciudad: 'Ciudad de ejemplo',
          estado: 'Estado de ejemplo',
          pais: 'País de ejemplo',
          codigoPostal: '00000',
          latitud: 0,
          longitud: 0
        },
        ofertas: [], // Las ofertas estarán vacías en este ejemplo
      };

      // Llamada al servicio para crear el anuncio
      await anunciosService.createAnuncio(nuevoAnuncio);
      setShowAlert(true); // Mostrar la alerta de éxito
    } catch (error) {
      console.error('Error al crear el anuncio:', error);
      setShowAlert(false); // Si hubo un error, no mostrar la alerta de éxito
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonLabel>Descripción</IonLabel>
        <IonInput
          value={descripcion}
          onIonInput={handleDescripcionChange} // Usamos el evento correcto para IonInput
          placeholder="Escribe la descripción del anuncio"
        />
        
        <IonLabel>Precio</IonLabel>
        <IonInput
          value={precio.toString()}
          onIonInput={handlePrecioChange} // Usamos el evento correcto para IonInput
          placeholder="Escribe el precio del anuncio"
          type="number"
        />

        <IonLabel>Fotos</IonLabel>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Maneja los archivos seleccionados
          multiple
        />

        <div>
          {fotos.map((foto, index) => (
            <img key={index} src={foto.url} alt={`Foto ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
          ))}
        </div>

        <IonButton onClick={handleCreateAnuncio} disabled={loading}>
          Crear Anuncio
        </IonButton>

        <IonLoading isOpen={loading} message="Creando anuncio..." />

        {/* Alerta de éxito/error */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={loading ? 'Creando anuncio...' : 'Anuncio creado correctamente'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CrearAnuncioPage;
