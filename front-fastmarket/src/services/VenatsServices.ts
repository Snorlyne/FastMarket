import authService from "./AuthService";

const API_URL = import.meta.env.VITE_APP_API_URL

const ventasServices  = {
    getVentas: async (): Promise<[]> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}Ventas/Ventas`, {
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
    getCompras: async (): Promise<[]> => {
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}Ventas/Compras`, {
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
}

export default ventasServices;