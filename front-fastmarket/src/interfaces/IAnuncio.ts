import { Ilocalizacion } from "./ILocalizacion";
import { IOferta } from "./IOferta";
import { IProducto } from "./IProducto";

export interface IAnuncio {
    id: number;
    estado: string;
    fecha_publicacion: Date;
    fecha_expiracion: Date;
    precio_anuncio: number;
    descripcion: string;
    tipo: string;
    productos: IProducto;
    localizacion: Ilocalizacion;
    ofertas: IOferta[];
}