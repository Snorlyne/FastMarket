import { EstadoOferta } from "../enums/EstadoOferta";
import { IAnuncio } from "../interfaces/IAnuncio";
import { ICreateOferta, IOferta } from "../interfaces/IOferta";
import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";
import chatService from "./ChatServices";

 const API_URL = /*  import.meta.env.VITE_APP_API_URL */ 'https://localhost:7087/';
//const API_URL = import.meta.env.VITE_APP_API_URL

const ofertasService = {
    getAll: async (): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas`, {
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
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    },
    getAllByToken: async (): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas/byToken`, {
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
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    },
    getAllByAnuncio: async (id: string): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas/anuncio/` + id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result: { ofertas: data.result.ofertas, isPropetario: data.result.propietario} };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    },
    getOferta: async (id: string): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas/` + id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return { isSuccess: true, message: "", result:  data.result};
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    },
    postOferta: async (id: string, req: ICreateOferta): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas/anuncio/` + id, {
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
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    },
    putEstadoOferta: async (id: number, req: EstadoOferta): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}ofertas/estado/` + id, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            const data = await response.json();

            if(data.isSuccess && req == EstadoOferta.Aceptada)[
                chatService.postMensaje(id, 'Hola, he aceptado tu oferta sobre mi producto')
            ]
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener ofertas', result: null };
        }
    }
}

export default ofertasService;