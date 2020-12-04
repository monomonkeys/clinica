import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fecha } from '../models/fecha';
import { Medico } from '../models/medico';
import { FechaService } from '../service/fecha.service';
import { MedicoService } from '../service/medico.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {
  registerForm = new FormGroup({
    horaInicio: new FormControl('',Validators.required),
    horaFinal: new FormControl('',Validators.required),
    medicoHorario: new FormControl('',Validators.required),
    tipoCita: new FormControl('',Validators.required),
    diaHorario: new FormControl('',Validators.required)
  })

  updateForm = new FormGroup({
    horaInicio: new FormControl('',Validators.required),
    horaFinal: new FormControl('',Validators.required),
    medicoHorario: new FormControl('',Validators.required),
    tipoCita: new FormControl('',Validators.required),
    diaHorario: new FormControl('',Validators.required)
  })

  fecha_form:any={
    "horaFinal": "",
    "horaInicio": "",
    "medicoHorario": {
      "idMedico": ""
    },
    "tipoCita": "",
    "diaHorario":""
  };
  medicos: Medico[] =[];
  fechas: Fecha[] = [];
  fecha: Fecha;
  medico: Medico;
  horaInicio: string;
  horaFinal: string;
  tipoCita: string[];
  diaHorario: string[];
  medicoHorario: Medico;
  idMedico: number;


  constructor(
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private medicoService: MedicoService,
    private router: Router,
    private modal: NgbModal
    ) { }

  ngOnInit() {
    this.cargaFechas();
    this.cargarMedicos();
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
        this.fecha = data;
        console.info(data);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  cargarMedicos(): void {
    this.medicoService.lista().subscribe(
      data => {
        this.medicos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  openVer(verFecha, id:number){
    this.modal.open(verFecha,{size:'lg'});
    this.fechaService.detail(id).subscribe(
      data => {
        this.fecha = data;
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

  borrarFecha(id: number) {
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
    //this.fecha = new Fecha(this.horaInicio, this.horaFinal, this.idMedico, this.tipoCita, this.diaHorario);
    /*var datos: Fecha = {
      horaFinal: this.horaFinal,
      horaInicio: this.horaInicio,
      medicoHorario: {
        idMedico: this.idMedico
      },
      tipoCita: this.tipoCita,
      diaHorario: this.diaHorario
    };
    console.log(datos);*/
    console.info(this.fecha_form);
    this.fechaService.save(this.fecha_form).subscribe(
      () => {
        this.toastr.success('Fecha Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(this.fecha);
        this.modal.dismissAll();
        window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        //console.log(this.fecha);
        console.log(err.error.message);
      }
    );
  }

  onUpdate(id: number): void {
    
    this.fechaService.update(id, this.fecha).subscribe(
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
