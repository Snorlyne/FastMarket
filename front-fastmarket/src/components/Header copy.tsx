import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

const HeaderHome = ({ title }: { title: string }) => {
  const history = useHistory();
  const route = history.location;

  const goBack = () => {
    history.push(route.pathname + "/chatlist");
  };

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="bg-slate-900">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-xl font-semibold text-white">
              FastMarket
            </h1>
          </div>

          {/* Botón de Chat */}
          <button 
            onClick={goBack}
            className="relative w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center hover:bg-green-500/30 transition-all"
          >
            <ChatBubbleLeftIcon className="h-6 w-6 text-green-500" />
            {/* Indicador de notificación */}
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full" />
          </button>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderHome;