import { Usuario } from './usuario';

export class Medico {
    idMedico?: number;
    nombreMedico: string;
    generoMedico: string[];
    especialidadMedico: string;
    cedulaMedico: string;
    telefonoMedico: string;
    usuario: Usuario;

    constructor(nombreMedico: string, generoMedico: string[], especialidadMedico: string, cedulaMedico: string, telefonoMedico: string, usuario: Usuario) {
        this.nombreMedico = nombreMedico;
        this.generoMedico = generoMedico;
        this.especialidadMedico = especialidadMedico;
        this.cedulaMedico = cedulaMedico;
        this.telefonoMedico = telefonoMedico;
        this.usuario = usuario;
    }
}
