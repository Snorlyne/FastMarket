import React from 'react';
import { 
  IonButtons, 
  IonButton, 
  IonModal, 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonTitle 
} from '@ionic/react';
import 'tailwindcss/tailwind.css';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const ProductContent: React.FC = () => (
    <div className="">
      <div className="carousel relative">
        <div className="relative overflow-x-scroll">
          <div className="flex">
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
            <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_613832-MLU72831725899_112023-O.webp"
                alt="Item 3"
              />
              <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"
                alt="Item 1"
              />
            </div>
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_735076-MLU72542109380_112023-O.webp"
                alt="Item 2"
              />
            </div>
            <div className="w-full h-80 bg-gray-300 flex-shrink-0">
             
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-xl font-bold text-black">Silla de escritorio</h1>
        <div className="mt-1">
        <p className="text-black">Valor del producto: <span className='text-green-600'>MX$600 </span></p>

        </div>


        <div className="mt-6">
          <h3 className="text-md font-semibold">Descripción:</h3>
          <p className="text-gray-600 text-justify">
            Es momento de ese cambio que tanto esperabas en tu hogar, home office u oficina. Con la
            Silla Ejecutiva de Oficina de respaldo alto obtendrás una comodidad inigualable.
          </p>
          <p className="text-black mt-2">Estado: Nuevo</p>
        </div>
        <button 
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
          onClick={() => console.log('Enviar propuesta')}
        >
          Aceptar propuesta
        </button>
      </div>
    </div>
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-light'>Producto Ofrecido</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} className='text-black font-light'>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ProductContent />
      </IonContent>
    </IonModal>
  );
};

export default ProductModal;