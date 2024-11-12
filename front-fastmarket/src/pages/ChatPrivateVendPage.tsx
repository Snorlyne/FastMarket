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
            <IonContent className="p-4 pb-20 bg-gray-50">
                <div className="space-y-4 py-4 px-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-4 rounded-2xl shadow-md max-w-[75%] ${userColors[message.ultimoMensaje === 'propio' ? 'propio' : 'entrante'] || 'bg-gray-200 text-gray-800'
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
            {(oferta && oferta.estado == 'aceptada') && (
                <IonFooter className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-300">
                    <div className="flex items-center space-x-2 p-4">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="text-sm text-black placeholder:text-gray-500 bg-white w-4/6 focus:border-none"
                        />
                        <div className="w-2/6 space-y-2">
                            <button onClick={sendMessage} className="w-full p-1 rounded-md bg-green-600 text-white font-medium">
                                Enviar
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setShowModal(true)} className="w-full p-1 rounded-md bg-indigo-600 text-white font-medium">
                        Acciones de oferta
                    </button>
                </IonFooter>
            )}

            <IonModal
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                breakpoints={[0, 0.30]}
                initialBreakpoint={0.30}
                className="p-4"
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Selecciona una acción</h2>
                    {oferta && oferta.idPersona === idUser ? (
                        <div>
                            <button onClick={() => handleOptionSelect(EstadoOferta.Pagada)} className="mt-4 p-2 rounded-md font-bold text-white w-full bg-green-600">
                                Pagar oferta
                            </button>
                            <button onClick={() => handleOptionSelect(EstadoOferta.Cancelada)} className="mt-4 p-2 rounded-md font-bold text-white w-full bg-red-600">
                                Cancelar oferta
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleOptionSelect(EstadoOferta.Rechazada)} className="mt-4 p-2 rounded-md font-bold text-white w-full bg-red-600">
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