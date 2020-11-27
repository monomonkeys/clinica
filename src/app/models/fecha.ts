export class Fecha {
    idFecha?: number;
    fechaHora: string;
    tipoCita: string[];

    constructor(fechaHora: string, tipoCita: string[]) {
        this.fechaHora = fechaHora;
        this.tipoCita = tipoCita;
    }
}
