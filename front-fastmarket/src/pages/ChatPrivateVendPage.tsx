import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonText, IonButton, IonInput, IonFooter, IonModal, IonList, useIonViewDidEnter } from '@ionic/react';
import 'tailwindcss/tailwind.css';
import Header from '../components/Header';
import { useParams } from 'react-router';
import chatService from '../services/ChatServices';
import ofertasService from '../services/OfertasServices';
import { EstadoOferta } from '../enums/EstadoOferta';
import authService from '../services/AuthService';
import Modal from '../components/Modals/Modal';

interface ViewParams {
    id: string;
}

interface Message {
    id: number;
    idOferta: number;
    idPersona: number;
    contenido: string;
    fechaEnvio: string;
    nombreChat: string;
    ultimoMensaje: string;
    persona: {
        id: number;
        nombre: string;
        apellido: string | null;
    };
}

const PrivateChat: React.FC = () => {
    const { id } = useParams<ViewParams>();
    const [idUser, setIdUser] = useState<any>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [oferta, setOferta] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', message: '', onConfirm: () => { } });

    const userColors: { [key: string]: string } = {
        'propio': 'bg-indigo-100',
        'entrante': 'bg-green-100 '
    };

    const fetchData = async () => {
        try {
            setIdUser(await authService.getId());
            const chatMessages = await chatService.getChat(Number(id));
            setMessages(chatMessages);

            const ofertaResponse = await ofertasService.getOferta(id);
            console.log("Oferta:", ofertaResponse);
            if (ofertaResponse?.result) {
                setOferta(ofertaResponse.result);
            } else {
                console.error("Error: No se pudo obtener la oferta.");
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };
    const fetchUser = async () => {
        setIdUser(await authService.getId());
    }
    useIonViewDidEnter(() => {
        fetchData();
        fetchUser();
    }, [id]);


    const sendMessage = async () => {
        if (newMessage.trim()) {
            await chatService.postMensaje(Number(id), newMessage);
            fetchData();
            setNewMessage('');
        }
    };

    const handleOptionSelect = (estado: EstadoOferta) => {
        setShowModal(false);
        let accion;
        switch (estado) {
            case EstadoOferta.Rechazada:
                accion = ['rechazar', 'rechazado'];
                break;
            case EstadoOferta.Cancelada:
                accion = ['cancelar', 'cancelado'];
                break;
            case EstadoOferta.Pagada:
                accion = ['pagar', 'pagado'];
                break;
            default:
                accion = 'desconocido';
        }
        setModalData({
            title: `Confirmar ${accion[0]}`,
            message: `¿Estás seguro de que deseas ${accion[0]} la oferta?`,
            onConfirm: () => updateOfertaEstado(estado, accion[1])
        });
        setIsModalOpen(true);
    };


    const updateOfertaEstado = async (estado: EstadoOferta, accion: string) => {
        setIsModalOpen(false);
        const response = await ofertasService.putEstadoOferta(Number(id), estado);
        if (response.isSuccess) {
            await chatService.postMensaje(Number(id), `Ha ${accion} la oferta.`);
            fetchData();
        } else {
            console.error(response.message);
        }
    };

    return (
        <IonPage>
            <Header title="Chat Privado" />
            <IonContent className="p-4 pb-20 ">
                <div
                    className={`overflow-y-auto ${oferta?.estado === 'Aceptada' ? 'h-[90%]' : 'h-[100%]'
                        } space-y-4 py-4 px-2`}
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-4 rounded-2xl shadow-md max-w-[75%] ${userColors[message.ultimoMensaje === 'propio' ? 'propio' : 'entrante'] || 'bg-gray-400 text-gray-800'
                                } ${message.ultimoMensaje === 'propio' ? 'self-end ml-auto' : 'self-start mr-auto'}`}
                        >
                            <IonText>
                                <p className="text-sm font-medium">
                                    <strong>{message.persona.nombre}:</strong> {message.contenido}
                                </p>
                            </IonText>
                        </div>
                    ))}
                </div>
            </IonContent>
            {(oferta && oferta.estado === 'aceptada') && (
            <IonFooter className="bg-slate-900 shadow-2xl rounded-t-3xl">
                <div className="flex items-center p-4 space-x-3">
                    <div className="flex-grow">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="
                                w-full 
                                px-4 
                                py-3 
                                text-sm 
                                bg-gray-100 
                                text-black
                                rounded-full 
                                border-2 
                                border-transparent
                                focus:outline-none 
                                focus:border-green-300 
                                transition-all
                                duration-300
                            "
                        />
                    </div>
                    <button 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim()}
                        className="
                            bg-green-500 
                            text-white 
                            p-3 
                            rounded-full 
                            hover:bg-green-600 
                            active:scale-95
                            transition-all
                            duration-300
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            shadow-md
                            hover:shadow-lg
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 9.5a59.768 59.768 0 0 1-3.216 5.803C15.443 17.905 12.172 20 8.786 20 5.55 20 2.867 18.114 2 15" />
                        </svg>
                    </button>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="
                        w-full 
                        py-4 
                        bg-indigo-600 
                        text-white 
                        font-semibold 
                        hover:bg-indigo-700 
                        active:bg-indigo-800
                        transition-colors
                        duration-300
                    "
                >
                    Acciones de oferta
                </button>
            </IonFooter>
        )}

<IonModal
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            breakpoints={[0, 0.30]}
            initialBreakpoint={0.30}
            className="rounded-t-3xl"
        >
            <div className="p-6 bg-slate-950 rounded-t-3xl">
                <h2 className="text-xl font-bold mb-6 text-center text-white">
                    Selecciona una acción
                </h2>
                {oferta && oferta.idPersona === idUser ? (
                    <div className="space-y-4">
                        <button 
                            onClick={() => handleOptionSelect(EstadoOferta.Pagada)} 
                            className="
                                w-full 
                                p-4 
                                rounded-2xl 
                                bg-green-500 
                                text-white 
                                font-semibold 
                                border-2 
                                transition-all
                                duration-300
                            "
                        >
                            Pagar oferta
                        </button>
                        <button 
                            onClick={() => handleOptionSelect(EstadoOferta.Cancelada)} 
                            className="
                                w-full 
                                p-4 
                                rounded-2xl 
                                bg-red-500 
                                text-white
                                font-semibold 
                                border-2 
                               
                                transition-all
                                duration-300
                            "
                        >
                            Cancelar oferta
                        </button>
                    </div>
                ) : (
                    <div>
                        <button 
                            onClick={() => handleOptionSelect(EstadoOferta.Rechazada)} 
                            className="
                                w-full 
                                p-4 
                                rounded-2xl 
                                bg-red-50 
                                text-red-700 
                                font-semibold 
                                border-2 
                                border-red-200
                                hover:bg-red-100
                                transition-all
                                duration-300
                            "
                        >
                            Rechazar oferta
                        </button>
                    </div>
                )}
            </div>
        </IonModal>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="warning"
                title={modalData.title}
                message={modalData.message}
                onConfirm={modalData.onConfirm}
            />
        </IonPage>
    );
};

export default PrivateChat;