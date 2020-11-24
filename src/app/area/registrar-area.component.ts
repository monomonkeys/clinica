import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../models/area';
import { AreaService } from '../service/area.service';

@Component({
  selector: 'app-registrar-area',
  templateUrl: './registrar-area.component.html',
  styleUrls: ['./registrar-area.component.css']
})
export class RegistrarAreaComponent implements OnInit {
  registerForm = new FormGroup({
    nombreArea: new FormControl('',Validators.required)
  })

  area: Area;
  nombreArea = '';

  constructor(
    private areaService: AreaService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.area = new Area(this.nombreArea);
    this.areaService.save(this.area).subscribe(
      () => {
        this.toastr.success('Area Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });


        this.router.navigate(['/listaArea']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/listaArea']);
  }

}

