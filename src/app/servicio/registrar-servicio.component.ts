import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from '../models/servicio';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.component.html',
  styleUrls: ['./registrar-servicio.component.css']
})
export class RegistrarServicioComponent implements OnInit {
  registerForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    precio: new FormControl('',[Validators.minLength(1), Validators.required])
  })

  servicio: Servicio;
  nombre = '';
  precio: number = null;

  constructor(
    private servicioService: ServicioService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.servicio = new Servicio(this.nombre, this.precio);
    this.servicioService.save(this.servicio).subscribe(
      () => {
        this.toastr.success('Servicio Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });


        this.router.navigate(['/listaServicio']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/listaServicio']);
  }

}
