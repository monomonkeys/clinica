import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteURL = environment.pacienteURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.pacienteURL + 'lista');
  }

  public detail(idPaciente: number): Observable<Paciente> {
    return this.httpClient.get<Paciente>(this.pacienteURL + `detail/${idPaciente}`);
  }

  public detailName(curpPaciente: string): Observable<Paciente> {
    return this.httpClient.get<Paciente>(this.pacienteURL + `detailname/${curpPaciente}`);
  }

  public save(paciente: Paciente): Observable<any> {
    return this.httpClient.post<any>(this.pacienteURL + 'create', paciente);
  }

  public update(idPaciente: number, paciente: Paciente): Observable<any> {
    return this.httpClient.put<any>(this.pacienteURL + `update/${idPaciente}`, paciente);
  }

  public delete(idPaciente: number): Observable<any> {
    return this.httpClient.delete<any>(this.pacienteURL + `delete/${idPaciente}`);
  }
}