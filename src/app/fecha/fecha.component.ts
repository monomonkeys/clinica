import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fecha } from '../models/fecha';
import { FechaService } from '../service/fecha.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {
  registerForm = new FormGroup({
    fecha: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required)
  })

  updateForm = new FormGroup({
    fecha: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required)
  })

  fechas: Fecha[] = [];
  fechaMod: Fecha;
  fecha: string;
  tipo: string[];

  constructor(
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal
    ) { }

  ngOnInit() {
    this.cargaFechas();
  }

  openXL(registroFecha){
    this.modal.open(registroFecha,{size:'xl'});
  }


  openEdit(editarFecha, id:number){
    this.modal.open(editarFecha,{size:'xl'});
    this.cargarDetalle(id);
  } 

  cargarDetalle(id:number): void{
    this.fechaService.detail(id).subscribe(
      data => {
        this.fechaMod = data;
        console.info(data);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  openVer(verFecha, id:number){
    this.modal.open(verFecha,{size:'lg'});
    this.fechaService.detail(id).subscribe(
      data => {
        this.fechaMod = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  } 
  
  

  cargaFechas(): void {
    this.fechaService.lista().subscribe(
      data => {
        this.fechas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarMedico(id: number) {
    this.fechaService.delete(id).subscribe(
      data => {
        this.toastr.success('Fecha Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargaFechas();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  onRegister(): void {
    this.fechaMod = new Fecha(this.fecha, this.tipo);
    this.fechaService.save(this.fechaMod).subscribe(
      () => {
        this.toastr.success('Fecha Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });


        this.modal.dismissAll();
        window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(this.fechaMod);
        console.log(err.error.message);
      }
    );
  }

  onUpdate(id: number): void {
    
    this.fechaService.update(id, this.fechaMod).subscribe(
      data => {
        
        this.toastr.success('Fecha Actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.modal.dismissAll();
        window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.modal.dismissAll();
      }
    );
  }

}
