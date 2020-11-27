import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  citaURL = environment.citaURL;  

  constructor(private httpClient: HttpClient) { }
  

  public lista(): Observable<Cita[]> {
    return this.httpClient.get<Cita[]>(this.citaURL + 'lista');
  }

  public detail(idCita: number): Observable<Cita> {
    return this.httpClient.get<Cita>(this.citaURL + `detail/${idCita}`);
  }

  public save(cita: Cita): Observable<any> {
    return this.httpClient.post<any>(this.citaURL + 'create', cita);
  }

  public update(idCita: number, cita: Cita): Observable<any> {
    return this.httpClient.put<any>(this.citaURL + `update/${idCita}`, cita);
  }

  public delete(idCita: number): Observable<any> {
    return this.httpClient.delete<any>(this.citaURL + `delete/${idCita}`);
  }
}
