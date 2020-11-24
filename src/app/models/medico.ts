export class Medico {
    idMedico?: number;
    nombreMedico: string;
    generoMedico: string[];
    especialidadMedico: string;
    cedulaMedico: string;
    telefonoMedico: string;

    constructor(nombreMedico: string, generoMedico: string[], especialidadMedico: string, cedulaMedico: string, telefonoMedico: string) {
        this.nombreMedico = nombreMedico;
        this.generoMedico = generoMedico;
        this.especialidadMedico = especialidadMedico;
        this.cedulaMedico = cedulaMedico;
        this.telefonoMedico = telefonoMedico;
    }
}
