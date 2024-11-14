import { IAnuncio } from "../interfaces/IAnuncio";
import { IProducto } from "../interfaces/IProducto";
import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";

 const API_URL =  'https://localhost:7087/'
//const API_URL = import.meta.env.VITE_APP_API_URL
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
    },
    getById: async (id: string): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios/${parseInt(id)}`, {
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
    getByParams: async (params: { nombreProducto?: string; etiquetas?: string; ciudad?: string; estado?: string; pais?: string; codigoPostal?: string }): Promise<IResponse> => {
        const token = await authService.getToken();

        // Construcción de la URL con parámetros de consulta
        const query = new URLSearchParams();
        if (params.nombreProducto) query.append('nombreProducto', params.nombreProducto);
        if (params.etiquetas) query.append('etiquetas', params.etiquetas);
        if (params.ciudad) query.append('ciudad', params.ciudad);
        if (params.estado) query.append('estado', params.estado);
        if (params.pais) query.append('pais', params.pais);
        if (params.codigoPostal) query.append('codigoPostal', params.codigoPostal);

        try {
            const response = await fetch(`${API_URL}anuncios/filtrar?${query.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return { isSuccess: true, message: "", result: data.result };
            } else {
                return { isSuccess: false, message: data.message || 'Error al obtener anuncios', result: null };
            }
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener anuncios', result: null };
        }
    },
    post: async (req: any): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al crear anuncio', result: null };
        }
    },
    put: async (id: number, req: any): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios/` + id, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al crear anuncio', result: null };
        }
    },
    delete: async (id: string): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}anuncios/${parseInt(id)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al ELIMINAR anuncios', result: null };
        }
    },
}

export default anunciosService;