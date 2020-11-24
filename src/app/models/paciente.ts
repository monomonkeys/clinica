export class Paciente {
    idPaciente?: number;
    nombrePaciente: string;
    fechaNacimientoPaciente: string;
    generoPaciente: string[];
    curpPaciente: string;
    telefonoPaciente: string;

    constructor(nombrePaciente: string, fechaNacimientoPaciente: string, generoPaciente: string[], curpPaciente: string, telefonoPaciente: string) {
        this.nombrePaciente = nombrePaciente;
        this.fechaNacimientoPaciente = fechaNacimientoPaciente;
        this.generoPaciente = generoPaciente;
        this.curpPaciente = curpPaciente;
        this.telefonoPaciente = telefonoPaciente;
    }
}
