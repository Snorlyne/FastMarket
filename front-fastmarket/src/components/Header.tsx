import { IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Header = ({ title }: { title: string }) => {
    const history = useHistory(); 

    const goBack = () => {
        history.goBack(); 
    };

    return (
        <IonHeader className="bg-white" >
            <IonToolbar>
                <IonButtons slot="start">
                    <button onClick={goBack} className="inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </IonButtons>
                
                <IonTitle className="text-black text-lg font-bold">
                    {title}
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
