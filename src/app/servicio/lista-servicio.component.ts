import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-lista-servicio',
  templateUrl: './lista-servicio.component.html',
  styleUrls: ['./lista-servicio.component.css']
})
export class ListaServicioComponent implements OnInit {

  servicios: Servicio[] = [];

  constructor(
    private servicioService: ServicioService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.lista().subscribe(
      data => {
        this.servicios = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarServicio(id: number) {
    this.servicioService.delete(id).subscribe(
      data => {
        this.toastr.success('Servicio Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarServicios();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  registrarServicio(): void {
    this.router.navigate(['/registerServicio']);
  }

}

