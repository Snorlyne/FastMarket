import { IEtiqueta } from "./IEtiquetas";
import { IFoto } from "./IFoto";

export interface IProducto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    tipo: string;
    fotos: IFoto[];
    etiquetas: IEtiqueta[];
}