import React, { useState, ChangeEvent } from 'react';
import { IonPage, IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import Header from "../../components/Header";
import { Search } from "../../interfaces/ISearch";
import HeaderHome from '../../components/Header copy';

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [items] = useState<Search[]>([
    { id: 1, title: 'Silla de oficina' },
    { id: 2, title: 'Mesa de comedor' },
    { id: 3, title: 'Sofá de sala' },
    { id: 4, title: 'Cama matrimonial' },
    { id: 5, title: 'Escritorio para computadora' },
    ]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    };

    const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <IonPage>
        <div className="min-h-screen bg-gray-800">
{/*         <HeaderHome title="FastMarket" />
 */}
          {/* Barra de búsqueda */}
        <div className="max-w-xl mx-auto px-4 py-4">
            <div className="flex items-center bg-gray-900 rounded-full shadow-md p-2">
            <IonIcon icon={searchOutline} className="text-gray-500 w-6 h-6 ml-2" />
            <input
                type="text"
                placeholder="Buscar..."
                className="flex-1 p-2 bg-transparent outline-none rounded-full text-gray-200 placeholder-gray-500"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            </div>
        </div>
        <div className="max-w-xl mx-auto px-4 py-4 ">
            <h2 className="text-lg font-semibold text-white mb-4">
            Resultados de búsqueda
            </h2>
            {filteredItems.length > 0 ? (
            <ul className="space-y-2">
                {filteredItems.map((item) => (
                <li
                    key={item.id}
                    className="bg-gray-900 p-4 rounded-lg shadow-lg text-white "
                >
                    {item.title}
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-400">No se encontraron resultados</p>
            )}
        </div>
        </div>
    </IonPage>
    );
};

export default SearchPage;
