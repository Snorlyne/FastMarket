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
    <IonHeader >
      <IonToolbar className="custom-toolbar">
    

        <IonTitle className="text-white text-xl font-bold">{title}</IonTitle>

        <IonButtons slot="end">
          <button 
          onClick={goBack}
            className="p-2 text-white hover:text-gray-300 "
          >
             <ChatBubbleLeftIcon className="h-6 w-6 text-white" />

          </button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>



  );
};

export default HeaderHome;
