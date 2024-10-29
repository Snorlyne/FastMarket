import { IAnuncio } from "./IAnuncio";
import { IProducto } from "./IProducto";

export interface IOferta {
    Id: number;
    idPersona: number;
    idAnuncio: number;
    monto: number;
    fecha_oferta: Date;
    estado: string;
    tipo: string;
    anuncio: IAnuncio
    producto: IProducto[];
}