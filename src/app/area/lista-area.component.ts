import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../models/area';
import { AreaService } from '../service/area.service';

@Component({
  selector: 'app-lista-area',
  templateUrl: './lista-area.component.html',
  styleUrls: ['./lista-area.component.css']
})
export class ListaAreaComponent implements OnInit {

  areas: Area[] = [];

  constructor(
    private areaService: AreaService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cargarAreas();
  }

  cargarAreas(): void {
    this.areaService.lista().subscribe(
      data => {
        this.areas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarArea(id: number) {
    this.areaService.delete(id).subscribe(
      data => {
        this.toastr.success('Area Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarAreas();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  registrarArea(): void {
    this.router.navigate(['/registerArea']);
  }

}
