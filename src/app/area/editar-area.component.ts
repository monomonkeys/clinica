import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../models/area';
import { AreaService } from '../service/area.service';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent implements OnInit {
  registerForm = new FormGroup({
    nombreArea: new FormControl('',Validators.required)
  })


  area: Area = null;

  constructor(
    private areaService: AreaService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.areaService.detail(id).subscribe(
      data => {
        this.area = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/listaArea']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.areaService.update(id, this.area).subscribe(
      data => {
        this.toastr.success('Area Actualizada', 'OK', {
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