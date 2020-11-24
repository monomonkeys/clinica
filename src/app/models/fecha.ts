export class Fecha {
    idFecha?: number;
    fecha: string;
    tipo: string[];

    constructor(fecha: string, tipo: string[]) {
        this.fecha = fecha;
        this.tipo = tipo;
    }
}
