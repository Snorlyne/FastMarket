import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { IonPage } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";
import chatService from "../services/ChatServices";

interface Chat {
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
        idUsuario: number;
        usuarios: any | null;
    };
}

const ChatList: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const history = useHistory();

    useEffect(() => {
        const fetchChats = async () => {
            const data = await chatService.getChats();
            if (data) {
                setChats(data); 
            }
        };
        fetchChats();
    }, []);

    return (
        <IonPage>
            <Header title="Chats" />
            <div className="w-full max-w-md mx-auto px-4 bg-slate-900 h-screen shadow-lg">
                {/* Lista de chats */}
                <ul className="space-y-4 w-full mt-4">
                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            onClick={() => history.push(`${history.location.pathname}/chat/${chat.idOferta}`)}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-500 text-white rounded-full p-2">
                                    <ChatBubbleBottomCenterIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">{chat.nombreChat}</p>
                                    <p className="text-gray-600 text-sm">{chat.ultimoMensaje}: {chat.contenido}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">{new Date(chat.fechaEnvio).toLocaleTimeString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </IonPage>
    );
};

export default ChatList;
