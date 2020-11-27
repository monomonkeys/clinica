import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../models/paciente';
import { PacienteService } from '../service/paciente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.css']
})
export class ListaPacienteComponent implements OnInit {
  registerForm = new FormGroup({
    nombrePaciente: new FormControl('',Validators.required),
    fechaNacimientoPaciente: new FormControl('',Validators.required),
    generoPaciente: new FormControl('',Validators.required),
    curpPaciente: new FormControl('',[Validators.minLength(18), Validators.maxLength(18), Validators.required]),
    telefonoPaciente: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
  })

  updateForm = new FormGroup({
    nombrePaciente: new FormControl('',Validators.required),
    fechaNacimientoPaciente: new FormControl('',Validators.required),
    generoPaciente: new FormControl('',Validators.required),
    curpPaciente: new FormControl('',[Validators.minLength(18), Validators.maxLength(18), Validators.required]),
    telefonoPaciente: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
  })

  pacientes: Paciente[] = [];
  paciente: Paciente;
  nombrePaciente: string;
  fechaNacimientoPaciente: string;
  generoPaciente: string[];
  curpPaciente: string;
  telefonoPaciente: string;
  isAdmin = false;
  isMedico = false;
  isRecepcionista = false;

  constructor(
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.cargarPacientes();
    this.isAdmin = this.tokenService.isAdmin();
    this.isMedico = this.tokenService.isMedico();
    this.isRecepcionista = this.tokenService.isRecepcionista();
  }

  openXL(registroPaciente){
    this.modal.open(registroPaciente,{size:'xl'});
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

  onRegister(): void {
    this.paciente = new Paciente(this.nombrePaciente, this.fechaNacimientoPaciente, this.generoPaciente, this.curpPaciente, this.telefonoPaciente);
    this.pacienteService.save(this.paciente).subscribe(
      () => {
        this.toastr.success('Paciente Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });


        this.modal.dismissAll();
        window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(this.paciente);
        console.log(err.error.message);
      }
    );
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