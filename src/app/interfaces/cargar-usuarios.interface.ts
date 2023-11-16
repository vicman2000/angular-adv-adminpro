import { Usuario } from "../models/usuario.model";

export  interface iCargarUsuarios {
    total: number;
    usuarios: Usuario[];
}