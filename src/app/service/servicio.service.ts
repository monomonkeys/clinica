import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  servicioURL = environment.servicioURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Servicio[]> {
    return this.httpClient.get<Servicio[]>(this.servicioURL + 'lista');
  }

  public detail(id: number): Observable<Servicio> {
    return this.httpClient.get<Servicio>(this.servicioURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Servicio> {
    return this.httpClient.get<Servicio>(this.servicioURL + `detailname/${nombre}`);
  }

  public save(producto: Servicio): Observable<any> {
    return this.httpClient.post<any>(this.servicioURL + 'create', producto);
  }

  public update(id: number, producto: Servicio): Observable<any> {
    return this.httpClient.put<any>(this.servicioURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.servicioURL + `delete/${id}`);
  }
}