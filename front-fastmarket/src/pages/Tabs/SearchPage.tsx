import React, { useState, useEffect, ChangeEvent } from 'react';
import { IonPage, IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import HeaderHome from '../../components/Header copy';
import anunciosService from '../../services/AnunciosServices';
import { IResponse } from '../../interfaces/IResponse';
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

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    useEffect(() => {
        const fetchAnuncios = async () => {
            try {
                const response: IResponse = await anunciosService.getByParams({
                    nombreProducto: searchTerm,
                    // Añade otros parámetros de búsqueda si es necesario
                    // etiquetas: 'exampleEtiqueta',
                    // ciudad: 'exampleCiudad',
                    // estado: 'exampleEstado',
                    // pais: 'examplePais',
                    // codigoPostal: 'exampleCodigoPostal'
                });

                if (response.isSuccess) {
                    setFilteredItems(response.result);
                }
            } catch (error) {
                console.error("Error fetching anuncios:", error);
            }
        };

        if (searchTerm.trim()) {
            fetchAnuncios();
        } else {
            setFilteredItems([]); // Limpiar resultados si el término de búsqueda está vacío
        }
    }, [searchTerm]);


    return (
        <IonPage>
            <div className="min-h-screen bg-gray-100">
                <HeaderHome title="FastMarket" />

                {/* Search Bar */}
                <div className="max-w-xl mx-auto px-4 py-4">
                    <div className="flex items-center bg-white rounded-full shadow-md p-2">
                        <IonIcon icon={searchOutline} className="text-gray-500 w-6 h-6 ml-2" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="flex-1 p-2 bg-transparent outline-none rounded-full text-gray-800 placeholder-gray-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Search Results */}
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Resultados de búsqueda</h2>
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.map((anuncio) => (
                                <div key={anuncio.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                                    <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
                                        {anuncio.productos.fotos.length > 0 ? (
                                            <img
                                                src={anuncio.productos.fotos[0].url}
                                                alt={anuncio.productos.nombre}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                Sin Imagen
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="mt-4 font-semibold text-gray-800">{anuncio.productos.nombre}</h3>
                                    <p className="text-gray-500 text-sm">{anuncio.descripcion}</p>
                                    <p className="text-gray-700 font-bold mt-2">Precio: ${anuncio.precio_anuncio}</p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Ubicación: {anuncio.localizacion.ciudad}, {anuncio.localizacion.estado}, {anuncio.localizacion.pais}
                                    </p>
                                    <div className="mt-auto">
                                        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No se encontraron resultados</p>
                    )}
                </div>
            </div>
        </IonPage>
    );
};

export default SearchPage;
