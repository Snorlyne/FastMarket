import { IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";



const Header = ({ title }: { title: string }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <IonHeader >
       
            <IonToolbar className='flex items-center justify-between px-4 custom-toolbar'>
                <IonButtons slot="start">


                    <div className="button-container" onClick={goBack}>
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700 " />

                    </div>
                </IonButtons>

                <IonTitle className="text-black font-medium">
                    {title}
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
