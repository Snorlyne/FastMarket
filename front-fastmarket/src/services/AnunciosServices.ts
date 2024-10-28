import { IAnuncio } from "../interfaces/IAnuncio";
import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";

const API_URL = import.meta.env.VITE_APP_API_URL;

const anunciosService = {
    getAll: async (): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener anuncios', result: null };
        }
    },
    getAllByToken: async (): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios/byToken`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener anuncios', result: null };
        }
    }
}

export default anunciosService;