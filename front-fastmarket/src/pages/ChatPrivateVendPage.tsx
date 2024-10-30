import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonText,IonButton,IonInput,IonItem,IonLabel,IonFooter} from '@ionic/react';
import 'tailwindcss/tailwind.css';

const PrivateChat: React.FC = () => {
const [messages, setMessages] = useState([
    { sender: 'Vendedor', text: 'Hola, bienvenido al chat privado. ¿En qué puedo ayudarte?' },
    { sender: 'Cliente', text: 'Hola, estoy interesado en el reloj antiguo. ¿Podrías darme más detalles?' }
]);

const [newMessage, setNewMessage] = useState('');
const userColors: { [key: string]: string } = {
    'Vendedor': 'bg-indigo-100 text-indigo-700',
    'Cliente': 'bg-green-100 text-green-700'
};

const sendMessage = () => {
    if (newMessage.trim()) {
    setMessages([...messages, { sender: 'Vendedor', text: newMessage }]);
    setNewMessage('');
    }
};

return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
        <IonTitle className="text-center font-semibold text-lg">Chat Privado</IonTitle>
        </IonToolbar>
    </IonHeader>

    <IonContent className="p-4 pb-20 bg-gray-50">
        <div className="space-y-4">
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
        <IonButton onClick={sendMessage} expand="block" className="w-1/6 rounded-full bg-indigo-600 text-white font-medium">
            Enviar
        </IonButton>
        </div>
    </IonFooter>
    </IonPage>
);
};

export default PrivateChat;