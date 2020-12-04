import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/models/area';
import { Cita } from 'src/app/models/cita';
import { Fecha } from 'src/app/models/fecha';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { Servicio } from 'src/app/models/servicio';
import { AreaService } from 'src/app/service/area.service';
import { CitaService } from 'src/app/service/cita.service';
import { FechaService } from 'src/app/service/fecha.service';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent implements OnInit {

  updateForm = new FormGroup({
    nombrePaciente: new FormControl('',Validators.required),
    fechaNacimientoPaciente: new FormControl('',Validators.required),
    generoPaciente: new FormControl('',Validators.required),
    curpPaciente: new FormControl('',[Validators.minLength(18), Validators.maxLength(18), Validators.required]),
    telefonoPaciente: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
  })

  public registerForm:FormGroup;
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
  isSent = false;
  nombrePaciente: string;
  fechaNacimientoPaciente: string;
  generoPaciente: string[];
  curpPaciente: string;
  telefonoPaciente: string;
  isAdmin = false;
  isMedico = false;
  isRecepcionista = false;
  isPrevaloracion = false;
  filterPaciente = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal,
    private tokenService: TokenService,
    private citaService: CitaService,
    private areaService: AreaService,
    private servicioService: ServicioService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private fechaService: FechaService,
    ) { 
    this.registerForm =  this.formBuilder.group({
      nombrePaciente: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      fechaNacimientoPaciente: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      generoPaciente: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      curpPaciente: new FormControl('',Validators.compose(
        [
          Validators.minLength(18), 
          Validators.maxLength(18), 
          Validators.required
        ]
      )),
      telefonoPaciente: new FormControl('',Validators.compose(
        [
          Validators.minLength(10), 
          Validators.maxLength(10),
          Validators.required
        ]
      )),
      descripcionCita: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      diaCita: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      horaCita: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      areaCita: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      servicioCita: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      ))
    });
  }

  ngOnInit() {
    this.cargarPacientes();
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


  openEdit(editarPaciente, id:number){
    this.modal.open(editarPaciente,{size:'xl'});
    this.cargarDetalle(id);
  } 

  cargarDetalle(id:number): void{
    this.pacienteService.detail(id).subscribe(
      data => {
        this.paciente = data;
        console.info(data);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  openVer(verPaciente, id:number){
    this.modal.open(verPaciente,{size:'lg'});
    this.pacienteService.detail(id).subscribe(
      data => {
        this.paciente = data;
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

  borrarPaciente(id: number) {
    this.pacienteService.delete(id).subscribe(
      data => {
        this.toastr.success('Paciente Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarPacientes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  async onRegister() {
    this.isSent = true;
    if(this.registerForm.invalid){
      return false;
    }else{
      const cita_register: any = {
        "descripcionCita": this.registerForm.value.descripcionCita,
        "diaCita": this.registerForm.value.diaCita,
        "pacienteCita": {
          "nombrePaciente": this.registerForm.value.nombrePaciente,
          "fechaNacimientoPaciente": this.registerForm.value.fechaNacimientoPaciente,
          "generoPaciente": this.registerForm.value.generoPaciente,
          "curpPaciente": this.registerForm.value.curpPaciente,
          "telefonoPaciente": this.registerForm.value.telefonoPaciente
        },
        "horaCita": {
          "idFecha": this.registerForm.value.horaCita
        },
        "medicoCita": {
          "idMedico": 4
        },
        "areaCita": {
          "idArea": this.registerForm.value.areaCita,
        },
        "servicioCita": {
          "id": this.registerForm.value.servicioCita,
        }
      }
      console.info(cita_register);
        this.citaService.save(cita_register).subscribe(
          () => {
            this.toastr.success('Cita Creada', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.modal.dismissAll();
            window.location.reload();
          },
          err => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
            console.log(this.medico);
            console.log(err.error.message);
          }
        );
      }
  }

  onUpdate(id: number): void {
    
    this.pacienteService.update(id, this.paciente).subscribe(
      data => {
        
        this.toastr.success('Paciente Actualizado', 'OK', {
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
