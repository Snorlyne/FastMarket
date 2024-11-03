import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { useHistory } from "react-router-dom";

const HeaderHome = ({ title }: { title: string }) => {
  const history = useHistory();
  const route = history.location

  const goBack = () => {
    history.push(route.pathname+"/chatlist");
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <button onClick={goBack} className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15a2 2 0 00-2-2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2v10z"
              />
            </svg>
          </button>
        </IonButtons>

        <IonTitle className="text-black text-lg font-bold">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderHome;
