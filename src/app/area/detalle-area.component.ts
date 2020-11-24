import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../models/area';
import { AreaService } from '../service/area.service';

@Component({
  selector: 'app-detalle-area',
  templateUrl: './detalle-area.component.html',
  styleUrls: ['./detalle-area.component.css']
})
export class DetalleAreaComponent implements OnInit {

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
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/listaArea']);
  }

}