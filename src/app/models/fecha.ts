import { Medico } from './medico';

export class Fecha {
    idFecha?: number;
    horaInicio: string;
    horaFinal: string;
    medicoHorario: Medico;
    tipoCita: string[];
    diaHorario: string[];

    constructor(horaInicio: string, horaFinal: string, medicoHorario: Medico, tipoCita: string[], diaHorario: string[]) {
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.medicoHorario = medicoHorario;
        this.tipoCita = tipoCita;
        this.diaHorario = diaHorario;
    }
}
