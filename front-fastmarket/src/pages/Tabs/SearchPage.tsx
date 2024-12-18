import React, { useState, useEffect, ChangeEvent } from 'react';
import { IonPage, IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import HeaderHome from '../../components/Header copy';
import anunciosService from '../../services/AnunciosServices';
import { IResponse } from '../../interfaces/IResponse';
import { useHistory } from "react-router";
import LoadingCard from '../../components/LoaderCards';

interface Anuncio {
    id: number;
    productos: {
        nombre: string;
        descripcion: string;
        precio: number;
        fotos: { url: string }[];
    };
    localizacion: {
        ciudad: string;
        estado: string;
        pais: string;
    };
    fecha_publicacion: string;
    estado: string;
    precio_anuncio: number;
    descripcion: string;
}

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredItems, setFilteredItems] = useState<Anuncio[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const route = history.location;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchAnuncios = async () => {
            try {
                setIsLoading(true);
                const response: IResponse = await anunciosService.getByParams({
                    nombreProducto: searchTerm,
                });

                if (response.isSuccess) {
                    setFilteredItems(response.result);
                } else {
                    console.log("Error fetching anuncios: " + response.message);
                    setFilteredItems([]);
                }
            } catch (error) {
                console.error("Error fetching anuncios:", error);
                setFilteredItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (searchTerm.trim()) {
            fetchAnuncios();
        } else {
            setFilteredItems([]);
            setIsLoading(false);
        }
    }, [searchTerm]);

    return (
        <IonPage>
            <div className="h-screen bg-gray-900 flex flex-col">
                <HeaderHome title="FastMarket" />
                <div className="w-full px-4 py-4 bg-transparent">
                    <div className="max-w-xl mx-auto">
                        <div className="flex items-center bg-gray-800 rounded-full shadow-md p-2">
                            <IonIcon icon={searchOutline} className="text-gray-400 w-6 h-6 ml-2" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="flex-1 p-2 bg-transparent outline-none rounded-full text-gray-200 placeholder-gray-400"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="h-[75%] overflow-y-auto px-4">
                    <h2 className="text-lg font-semibold text-gray-200 mb-4">Resultados de búsqueda</h2>
                    
                    {isLoading ? (
                        <div className="flex flex-col gap-4 pb-4">
                            {[...Array(3)].map((_, index) => (
                                <LoadingCard key={index} />
                            ))}
                        </div>
                    ) : filteredItems.length > 0 ? (
                        <div className="flex flex-col gap-4 pb-4">
                            {filteredItems.map((anuncio) => (
                                <div key={anuncio.id} className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-row gap-4">
                                    {/* Existing card content remains the same */}
                                    <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                        {anuncio.productos.fotos.length > 0 ? (
                                            <img
                                                src={anuncio.productos.fotos[0].url}
                                                alt={anuncio.productos.nombre}
                                                className="w-32 h-32 object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                Sin Imagen
                                            </div>
                                        )}
                                    </div>

                                    {/* Rest of the card content */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-200 mb-2">{anuncio.productos.nombre}</h3>
                                        <p className="text-2xl font-bold text-gray-200 mb-2">$ {anuncio.precio_anuncio}</p>
                                        <p className="text-gray-400 text-sm mb-2">{anuncio.descripcion.length > 30 ? '...' : ''}</p>
                                        <p className="text-gray-400 text-sm">
                                            Ubicación: {anuncio.localizacion.ciudad}, {anuncio.localizacion.estado}, {anuncio.localizacion.pais}
                                        </p>
                                        <div className="mt-auto">
                                            <button 
                                                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                                onClick={() => history.push(route.pathname + "/ViewProduct/" + anuncio.id)}
                                            >
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No se encontraron resultados</p>
                    )}
                </div>
            </div>
        </IonPage>
    );
};

export default SearchPage;