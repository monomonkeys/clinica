import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '../models/medico';
import { Usuario } from '../models/usuario';
import { MedicoService } from '../service/medico.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  registerForm = new FormGroup({
    nombreMedico: new FormControl('',Validators.required),
    generoMedico: new FormControl('',Validators.required),
    especialidadMedico: new FormControl('',Validators.required),
    cedulaMedico: new FormControl('',[Validators.minLength(7), Validators.maxLength(10), Validators.required]),
    telefonoMedico: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
  })

  updateForm = new FormGroup({
    nombreMedico: new FormControl('',Validators.required),
    generoMedico: new FormControl('',Validators.required),
    especialidadMedico: new FormControl('',Validators.required),
    cedulaMedico: new FormControl('',[Validators.minLength(7), Validators.maxLength(10), Validators.required]),
    telefonoMedico: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
  })

  medicos: Medico[] = [];
  usuarios: Usuario[] = [];
  medico: Medico;
  nombreMedico: string;
  generoMedico: string[];
  especialidadMedico: string;
  cedulaMedico: string;
  telefonoMedico: string;
  usuario: Usuario;

  constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal
    ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.cargarUsuarios();
  }

  openXL(registroMedico){
    this.modal.open(registroMedico,{size:'xl'});
  }


  openEdit(editarMedico, id:number){
    this.modal.open(editarMedico,{size:'xl'});
    this.cargarDetalle(id);
  } 

  cargarDetalle(id:number): void{
    this.medicoService.detail(id).subscribe(
      data => {
        this.medico = data;
        console.info(data);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  cargarUsuarios(): void {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  openVer(verMedico, id:number){
    this.modal.open(verMedico,{size:'lg'});
    this.medicoService.detail(id).subscribe(
      data => {
        this.medico = data;
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

  borrarMedico(id: number) {
    this.medicoService.delete(id).subscribe(
      data => {
        this.toastr.success('Medico Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarMedicos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  onRegister(): void {
    this.medico = new Medico(this.nombreMedico, this.generoMedico, this.especialidadMedico, this.cedulaMedico, this.telefonoMedico, this.usuario);
    this.medicoService.save(this.medico).subscribe(
      () => {
        this.toastr.success('Medico Creado', 'OK', {
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

  onUpdate(id: number): void {
    
    this.medicoService.update(id, this.medico).subscribe(
      data => {
        
        this.toastr.success('Medico Actualizado', 'OK', {
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
