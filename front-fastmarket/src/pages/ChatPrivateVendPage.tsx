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
        <Header title={'Chat Privado'} />

    <IonContent className="p-4 pb-20 bg-gray-50">
        <div className="space-y-4 py-4 px-2">
        {messages.map((message, index) => (
            <div
            key={index}
            className={`p-4 rounded-2xl shadow-md max-w-[75%] ${
                userColors[message.sender] || 'bg-gray-200 text-gray-800'
            } ${message.sender === 'Vendedor' ? 'self-end ml-auto' : 'self-start mr-auto'}`}
            >
            <IonText>
                <p className="text-sm font-medium">
                <strong>{message.sender}:</strong> {message.text}
                </p>
            </IonText>
            </div>
        ))}
        </div>
    </IonContent>

    <IonFooter className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-300">
        <div className="flex items-center space-x-2">
        <IonItem className="flex-grow bg-gray-100 rounded-full">
            <IonLabel position="stacked" className="hidden">Tu mensaje</IonLabel>
            <IonInput
            value={newMessage}
            onIonChange={(e) => setNewMessage(e.detail.value!)}
            placeholder="Escribe tu mensaje..."
            className="px-4 text-sm"
            />
        </IonItem>
        <IonButton onClick={sendMessage} expand="block" className="w-2/6 rounded-full bg-indigo-600 text-white font-medium">
            Enviar
        </IonButton>
        </div>
    </IonFooter>
    </IonPage>
);
};

export default PrivateChat;
