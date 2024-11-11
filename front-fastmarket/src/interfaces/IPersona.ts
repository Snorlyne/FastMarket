import { IUsuario } from "./IUsuario";

export interface IPersona {
    id: number;
    nombre: string;
    apellido: string;
    idUsuario: number;
    usuarios: IUsuario
}