import { IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Header = ({ title }: { title: string }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <IonHeader className="ion-no-border">
            <IonToolbar className="bg-slate-900">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Botón de Regreso */}
                    <button 
                        onClick={goBack}
                        className="relative flex items-center justify-center w-10 h-10 rounded-xl 
                                 bg-slate-800/50 hover:bg-slate-700/50 active:bg-slate-600/50 
                                 transition-all duration-200 group"
                    >
                        <ArrowLeftIcon className="w-6 h-6 text-white group-hover:scale-95 transition-transform" />
                        
                        {/* Efecto de ripple al hacer click */}
                        <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 
                                     group-active:opacity-100 transition-opacity duration-300" />
                    </button>

                    {/* Título centrado */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-lg font-semibold text-white whitespace-nowrap">
                            {title}
                        </h1>
                    </div>

                    {/* Elemento fantasma para mantener el espaciado */}
                    <div className="w-10 h-10" />
                </div>

                {/* Línea decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] 
                            bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;