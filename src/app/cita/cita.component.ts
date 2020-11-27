import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../models/area';
import { Cita } from '../models/cita';
import { Fecha } from '../models/fecha';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';
import { Servicio } from '../models/servicio';
import { AreaService } from '../service/area.service';
import { CitaService } from '../service/cita.service';
import { FechaService } from '../service/fecha.service';
import { MedicoService } from '../service/medico.service';
import { PacienteService } from '../service/paciente.service';
import { ServicioService } from '../service/servicio.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  registerForm = new FormGroup({
    descripcionCita: new FormControl('',Validators.required),
    fechaCita: new FormControl('',Validators.required),
    medicoCita: new FormControl('',Validators.required),
    pacienteCita: new FormControl('',Validators.required),
    areaCita: new FormControl('',Validators.required),
    servicioCita: new FormControl('',Validators.required)
  })

  updateForm = new FormGroup({
    descripcionCita: new FormControl('',Validators.required),
    fechaCita: new FormControl('',Validators.required),
    medicoCita: new FormControl('',Validators.required),
    pacienteCita: new FormControl('',Validators.required),
    areaCita: new FormControl('',Validators.required),
    servicioCita: new FormControl('',Validators.required)
  })

  citas: Cita[] = [];
  areas: Area[] =[];
  servicios: Servicio[] =[];
  medicos: Medico[] =[];
  pacientes: Paciente[] =[];
  fechas: Fecha[] =[];
  area: Area;
  cita: Cita;
  servicio: Servicio;
  medico: Medico;
  paciente: Paciente;
  fecha: Fecha;
  descripcionCita: string;
  fechaCita: Fecha;
  areaCita: Area;
  medicoCita: Medico;
  pacienteCita: Paciente;
  servicioCita: Servicio;
  isAdmin = false;
  isMedico = false;
  isRecepcionista = false;
  nombreUsuario: string;


  constructor(
    private citaService: CitaService,
    private areaService: AreaService,
    private servicioService: ServicioService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.cargaCitas();
    this.nombreUsuario = this.tokenService.getUserName();
    this.isAdmin = this.tokenService.isAdmin();
    this.isMedico = this.tokenService.isMedico();
    this.isRecepcionista = this.tokenService.isRecepcionista();
    
  }

  openXL(registroCita){
    this.modal.open(registroCita,{size:'xl'});
    this.cargarAreas();
    this.cargaFechas();
    this.cargarMedicos();
    this.cargarPacientes();
    this.cargarMedicos();
    this.cargarServicios();
  }


  openEdit(editarCita, id:number){
    this.modal.open(editarCita,{size:'xl'});
    this.cargarDetalle(id);
  } 

  cargarDetalle(id:number): void{
    this.citaService.detail(id).subscribe(
      data => {
        this.cita = data;
        console.info(data);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
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

  cargarPacientes(): void {
    this.pacienteService.lista().subscribe(
      data => {
        this.pacientes = data;
      },
      err => {
        console.log(err);
      }
    );
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

  openVer(verCita, id:number){
    this.modal.open(verCita,{size:'lg'});
    this.citaService.detail(id).subscribe(
      data => {
        this.cita = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  } 
  
  

  cargaCitas(): void {
    this.citaService.lista().subscribe(
      data => {
        this.citas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrarCita(id: number) {
    this.citaService.delete(id).subscribe(
      data => {
        this.toastr.success('Cita Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargaCitas();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  onRegister(): void {
    this.cita = new Cita(this.descripcionCita, this.fechaCita, this.areaCita, this.medicoCita, this.pacienteCita, this.servicioCita);
    this.citaService.save(this.cita).subscribe(
      () => {
        this.toastr.success('Cita Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(this.cita);
        //this.modal.dismissAll();
        //window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(this.cita);
        console.log(err.error.message);
      }
    );
  }

  onUpdate(id: number): void {
    
    this.citaService.update(id, this.cita).subscribe(
      data => {
        
        this.toastr.success('Cita Actualizada', 'OK', {
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
