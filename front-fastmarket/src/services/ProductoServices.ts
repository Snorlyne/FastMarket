import { IResponse } from "../interfaces/IResponse";
import authService from "./AuthService";
import { IProducto } from "../interfaces/IProducto";

//const API_URL = /* import.meta.env.VITE_APP_API_URL */ 'https://localhost:7087/';
const API_URL =  import.meta.env.VITE_APP_API_URL 
const ProductoService = {
    PostProducto: async (Iproducto: IProducto): Promise<IResponse> => {
        const token = await authService.getToken();
        try {
            const producto = await fetch(`${API_URL}Productos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Iproducto)  
            });
            const data = await producto.json();
            return { isSuccess: true, message: "", result: data.result };
        } catch (error) {
            console.error('Unexpected error:', (error as Error).message);
            return { isSuccess: false, message: 'Error al obtener anuncios', result: null };
        }
    },
};

export default ProductoService;
