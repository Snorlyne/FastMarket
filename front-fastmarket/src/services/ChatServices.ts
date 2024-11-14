import authService from "./AuthService";

//  const API_URL = /*  import.meta.env.VITE_APP_API_URL */ 'https://localhost:7087/';
const API_URL = import.meta.env.VITE_APP_API_URL

const chatService = {
    getChats: async (): Promise<[]> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}Mensajes/UltimosMensajes/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return []
        }
    },
    getChat: async (id: number): Promise<[]> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}Mensajes/Chat/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return []
        }
    },
    postMensaje: async (id: number, contenido: string): Promise<string | null> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}Mensajes/Enviar/` + id, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contenido })
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return null
        }
    }
}

export default chatService;