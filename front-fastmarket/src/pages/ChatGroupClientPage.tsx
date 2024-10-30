import React, { useState } from 'react';
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonText,IonButton,IonInput,IonItem,IonLabel,IonFooter} from '@ionic/react';
import 'tailwindcss/tailwind.css';

const AuctionChat: React.FC = () => {
const [messages, setMessages] = useState([
    { sender: 'Vendedor', text: 'Hola a todos, bienvenidos a nuestra subasta de hoy. Tenemos un maravilloso reloj antiguo para subastar. La puja inicial comienza en $100. ¿Algún interesado en comenzar la oferta?' },
    { sender: 'Cliente 1', text: '¡Yo! Ofrezco $120 por el reloj.' },
    { sender: 'Cliente 2', text: 'Subo la oferta a $150.' },
    { sender: 'Vendedor', text: 'Gracias, Cliente 2. Tenemos una oferta de $150. ¿Alguien más quiere mejorar la oferta?' },
]);

const [newMessage, setNewMessage] = useState('');

const userColors: { [key: string]: string } = {
    'Vendedor': 'bg-indigo-100 text-indigo-700',
    'Cliente 1': 'bg-green-100 text-green-700',
    'Cliente 2': 'bg-purple-100 text-purple-700',
    'Cliente 3': 'bg-yellow-100 text-yellow-700',
    'Tú': 'bg-blue-100 text-blue-700'
};

const sendMessage = () => {
    if (newMessage.trim()) {
    setMessages([...messages, { sender: 'Tú', text: newMessage }]);
    setNewMessage('');
    }
};

return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
        <IonTitle className="text-center font-semibold text-lg">Subasta en Vivo</IonTitle>
        </IonToolbar>
    </IonHeader>

    <IonContent className="p-4 pb-20 bg-gray-50">
        <div className="space-y-4">
        {messages.map((message, index) => (
            <div
            key={index}
            className={`p-4 rounded-2xl shadow-md max-w-[75%] ${
                userColors[message.sender] || 'bg-gray-200 text-gray-800'
            } ${message.sender === 'Tú' ? 'self-end ml-auto' : 'self-start mr-auto'}`}
            >
            <IonText>
                <p className="text-sm font-medium">
                <strong>{message.sender === 'Tú' ? 'Tú' : message.sender}:</strong> {message.text}
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
        <IonButton onClick={sendMessage} expand="block" className="w-1/6 rounded-full bg-blue-500 text-white font-medium">
            Enviar
        </IonButton>
        </div>
</IonFooter>
    </IonPage>
);
};

export default AuctionChat;
