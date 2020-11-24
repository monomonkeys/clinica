import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoURL = environment.medicoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Medico[]> {
    return this.httpClient.get<Medico[]>(this.medicoURL + 'lista');
  }

  public detail(idMedico: number): Observable<Medico> {
    return this.httpClient.get<Medico>(this.medicoURL + `detail/${idMedico}`);
  }

  public save(medico: Medico): Observable<any> {
    return this.httpClient.post<any>(this.medicoURL + 'create', medico);
  }

  public update(idMedico: number, medico: Medico): Observable<any> {
    return this.httpClient.put<any>(this.medicoURL + `update/${idMedico}`, medico);
  }

  public delete(idMedico: number): Observable<any> {
    return this.httpClient.delete<any>(this.medicoURL + `delete/${idMedico}`);
  }
}