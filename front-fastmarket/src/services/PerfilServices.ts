import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";

//const API_URL = /*  import.meta.env.VITE_APP_API_URL */ 'https://localhost:7087/';
const API_URL =  import.meta.env.VITE_APP_API_URL 

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
            return { isSuccess: false, message: 'Error al obtener perfil', result: error };
        }
    },
    async deletePerfil(id: string): Promise<IResponse> {
        try {
            const response = await fetch(`${API_URL}personas/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Error al eliminar perfil');
            }
            
            return { isSuccess: true, message: "Perfil eliminado exitosamente", result: await response.json() };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al eliminar perfil', result: error };
        }
    },
    async deleteCorreo(id: string): Promise<IResponse> {
        try {
            const correoEliminar = await fetch(`${API_URL}Usuarios/${id}`, {
                method: 'DELETE',
            });
            
            if (!correoEliminar.ok) {
                throw new Error('Error al eliminar correo');
            }
            
            return { isSuccess: true, message: "Correo eliminado exitosamente", result: await correoEliminar.json() };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al eliminar correo', result: error };
        }
    }
};

export default perfilService;
