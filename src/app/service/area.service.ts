import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService{

  areaURL = environment.areaURL;  

  constructor(private httpClient: HttpClient) { }
  

  public lista(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(this.areaURL + 'lista');
  }

  public detail(idArea: number): Observable<Area> {
    return this.httpClient.get<Area>(this.areaURL + `detail/${idArea}`);
  }

  public detailName(nombreArea: string): Observable<Area> {
    return this.httpClient.get<Area>(this.areaURL + `detailname/${nombreArea}`);
  }

  public save(area: Area): Observable<any> {
    return this.httpClient.post<any>(this.areaURL + 'create', area);
  }

  public update(idArea: number, area: Area): Observable<any> {
    return this.httpClient.put<any>(this.areaURL + `update/${idArea}`, area);
  }

  public delete(idArea: number): Observable<any> {
    return this.httpClient.delete<any>(this.areaURL + `delete/${idArea}`);
  }
}