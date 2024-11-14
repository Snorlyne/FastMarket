import { Storage } from '@ionic/storage';
import { IResponse } from '../interfaces/IResponse';
import { IRegistro } from '../interfaces/IRegister';

let store: Storage | null = null;

// Initialize the Storage only once
const initStorage = async () => {
    if (!store) {
        store = new Storage();
        await store.create();
    }
};

// Function to set a value in storage
const setStorageItem = async (key: string, value: string): Promise<void> => {
    try {
        await initStorage();
        await store?.set(key, value);
    } catch (error) {
        console.error(`Error setting item [${key}] in storage:`, error);
    }
};

// Function to get a value from storage
const getStorageItem = async (key: string): Promise<string | null> => {
    try {
        await initStorage();
        return await store?.get(key) || null;
    } catch (error) {
        console.error(`Error getting item [${key}] from storage:`, error);
        return null;
    }
};

// Function to clear all items in storage
const removeStorageItem = async (): Promise<void> => {
    try {
        await initStorage();
        await store?.clear();
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};

// API URL from environment variables
 const API_URL = /* import.meta.env.VITE_APP_API_URL  */ 'https://localhost:7087/';
//const API_URL =  import.meta.env.VITE_APP_API_URL 

// AuthService object
const authService = {
    // Login function
    login: async (correo: string, contraseña: string): Promise<IResponse> => {
        try {
            const response = await fetch(`${API_URL}auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contraseña }),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Login request failed: ${response.status} - ${errorDetails}`);
            }

            const data = await response.json();

            if (data.token !== undefined) {
                const token  = data.token;
                const id = data.id;
                await setStorageItem('token', token);
                await setStorageItem('id', id);
                return { isSuccess: true, message: "Login exitoso", result: null };
            }

            return { isSuccess: false, message: data.message, result: null };

        } catch (error) {
            console.error('Unexpected login error:', (error as Error).message);
            return { isSuccess: false, message: 'Login failed', result: null };
        }
    },

    // Register function
    register: async (request: IRegistro): Promise<IResponse> => {
        try {
            const response = await fetch(`${API_URL}registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Register request failed: ${response.status} - ${errorDetails}`);
            }

            const data = await response.json();
            return { isSuccess: data.isSuccess, message: data.message, result: data.result };

        } catch (error) {
            console.error('Unexpected register error:', (error as Error).message);
            return { isSuccess: false, message: 'Registration failed', result: null };
        }
    },

    // Logout function
    logout: async (): Promise<void> => {
        await removeStorageItem();
    },

    // Function to get the token from storage
    getToken: async (): Promise<string | null> => {
        return await getStorageItem('token');
    },
    // Function to get the id from storage
    getId: async (): Promise<string | null> => {
        return await getStorageItem('id');
    },
};

export default authService;
