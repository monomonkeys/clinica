import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL = environment.usuarioURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL + 'usuarios');
  }

  public detail(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + `usuario/${id}`);
  }

  public detailName(nombre: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + `usuarioNombre/${nombre}`);
  }

  public save(producto: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.usuarioURL + 'create', producto);
  }

  public update(id: number, producto: Usuario): Observable<any> {
    return this.httpClient.put<any>(this.usuarioURL + `updateUsuario/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.usuarioURL + `deleteUsuario/${id}`);
  }
}
