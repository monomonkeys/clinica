import { Area } from './area';
import { Fecha } from './fecha';
import { Medico } from './medico';
import { Paciente } from './paciente';
import { Servicio } from './servicio';

export class Cita {
    idCita?: number;
    descripcionCita: string;
    fechaCita: Fecha;
    areaCita: Area;
    medicoCita: Medico;
    pacienteCita: Paciente;
    servicioCita: Servicio;

    constructor(descripcionCita: string, fechaCita: Fecha, areaCita: Area, medicoCita: Medico, pacienteCita: Paciente, servicioCita: Servicio) {
        this.descripcionCita = descripcionCita;
        this.fechaCita = fechaCita;
        this.areaCita = areaCita;
        this.medicoCita = medicoCita;
        this.pacienteCita = pacienteCita;
        this.servicioCita = servicioCita;
    }
}
