import React from "react";
import "tailwindcss/tailwind.css";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons
import { IonPage } from "@ionic/react";
import Header from "../components/Header";
import { useHistory } from "react-router";

// Sample data for chats
const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "!",
    time: "10:45 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "??",
    time: "9:30 AM",
  },
  {
    id: 3,
    name: "Bob Johnson",
    lastMessage: "Ok",
    time: "Yesterday",
  },
];

const ChatList: React.FC = () => {
    const history = useHistory();
    const route = history.location
  return (
    <IonPage>
      <Header title="Chats" />
      <div className="w-full min-h-screen max-w-md mx-auto  px-4 bg-white h-screen shadow-lg">
        {/* Chat List */}
        <ul className="space-y-4 w-full mt-4">
          {chats.map((chat) => (
            <li
            onClick={() => history.push(route.pathname + "/chat/"+chat.id)}
              key={chat.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <ChatBubbleBottomCenterIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-black">{chat.name}</p>
                  <p className="text-gray-600 text-sm">{chat.lastMessage}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{chat.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </IonPage>
  );
};

export default ChatList;
