import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";

const API_URL = import.meta.env.VITE_APP_API_URL;

const perfilService = {
    getPerfil: async (): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}personas/byToken`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener perfil', result: (error as Error)};
        }
    }
}

export default perfilService;