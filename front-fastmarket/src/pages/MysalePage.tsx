import { IonPage } from '@ionic/react';
import Header from '../components/Header';
import { useHistory } from "react-router";


const Mysale: React.FC = () => {

  const history = useHistory();

  
  return (
    <IonPage>
      <div className="min-h-screen bg-gray-100">
        <Header title="Mis ventas" />

        <div className="p-2 m-2">
         
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-2xl text-black font-medium mb-3">Mis Ventas:</h2>
        <div className="grid grid-cols-2 gap-4">

          {/* Cards del producto */}
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full aspect-square">
        <img 
          src={ "https://http2.mlstatic.com/D_NQ_NP_630525-MLU72612729871_112023-O.webp"} 
          className="w-full h-full object-cover bg-gray-200"
        />
      </div>
      <div className="p-2 space-y-1">
        <h3 className="text-xl font-bold text-gray-600">Silla de oficina</h3>
        <div className='flex justify-between'>
        <p className='text-red-400 text-lg font-bold'>  Vendido</p>
        </div>
        {/* <button 
          className="w-full bg-blue-500 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors" onClick={() => history.push("/ViewProduct")}
        >
          ENTRAR
        </button> */}
      </div>
    </div>




  


   
        </div>
      </div>




      </div>
    </IonPage>

  );
};

export default Mysale;
