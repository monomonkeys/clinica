import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fecha } from '../models/fecha';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  fechaURL = environment.fechaURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Fecha[]> {
    return this.httpClient.get<Fecha[]>(this.fechaURL + 'lista');
  }

  public detail(idFecha: number): Observable<Fecha> {
    return this.httpClient.get<Fecha>(this.fechaURL + `detail/${idFecha}`);
  }

  public save(fecha: Fecha): Observable<any> {
    return this.httpClient.post<any>(this.fechaURL + 'create', fecha);
  }

  public update(idFecha: number, fecha: Fecha): Observable<any> {
    return this.httpClient.put<any>(this.fechaURL + `update/${idFecha}`, fecha);
  }

  public delete(idFecha: number): Observable<any> {
    return this.httpClient.delete<any>(this.fechaURL + `delete/${idFecha}`);
  }
}
