import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '../models/medico';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Usuario } from '../models/usuario';
import { AuthService } from '../service/auth.service';
import { MedicoService } from '../service/medico.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public registerForm:FormGroup;
  isSent = false;
  

  updateForm = new FormGroup({
    nombreMedico: new FormControl('',Validators.required),
    generoMedico: new FormControl('',Validators.required),
    especialidadMedico: new FormControl('',Validators.required),
    cedulaMedico: new FormControl('',[Validators.minLength(7), Validators.maxLength(10), Validators.required]),
    telefonoMedico: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
    nombreUsuario: new FormControl('',[Validators.minLength(4), Validators.required]),
    password: new FormControl('',[Validators.minLength(4), Validators.required]),
    repassword: new FormControl('',[Validators.minLength(4), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required])
  })

  medico_form:any={
    "nombreMedico": "",
    "especialidadMedico": "",
    "generoMedico": "",
    "cedulaMedico": "",
    "telefonoMedico": "",
    "usuario": {
        "nombreUsuario": "",
        "email": "",
        "password": "",
        "roles": [
          {
            "rolNombre": "ROLE_MEDICO"
          }
        ]
    },
    "rol": {
      "rolNombre": "ROLE_MEDICO"
    }
  };

  medicos: Medico[] = [];
  nuevoUsuario: NuevoUsuario;
  usuarios: Usuario[] = [];
  medico: Medico;
  nombreMedico: string;
  generoMedico: string[];
  especialidadMedico: string;
  cedulaMedico: string;
  telefonoMedico: string;
  usuario: Usuario;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  roles: string[];

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService,
  ) {
    this.registerForm =  this.formBuilder.group({
      nombreMedico: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      generoMedico: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      especialidadMedico: new FormControl('',Validators.compose(
        [
          Validators.required
        ]
      )),
      cedulaMedico: new FormControl('',Validators.compose(
        [
          Validators.minLength(7), 
          Validators.maxLength(10), 
          Validators.required
        ]
      )),
      telefonoMedico: new FormControl('',Validators.compose(
        [
          Validators.minLength(10), 
          Validators.maxLength(10), 
          Validators.required
        ]
      )),
      nombreUsuario: new FormControl('',Validators.compose(
        [
          Validators.minLength(4), 
          Validators.required
        ]
      )),
      password: new FormControl('',Validators.compose(
        [
          Validators.minLength(4), 
          Validators.required
        ]
      )),
      repassword: new FormControl('',Validators.compose(
        [
          Validators.minLength(4), 
          Validators.required
        ]
      )),
      email: new FormControl('',Validators.compose(
        [
          Validators.email, 
          Validators.required
        ]
      ))
    });
  }


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

  async onRegister() {
    this.isSent=true;
    if(this.registerForm.invalid){
      return false;
    }else{
      if(this.registerForm.value.password !=
        this.registerForm.value.repassword){
          const toast = await this.toastr.error('Fail', 'Password y Repetir Password no son iguales',{
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          return false;
        }else{
          const medico_register: any = {
            "nombreMedico": this.registerForm.value.nombreMedico,
            "especialidadMedico": this.registerForm.value.especialidadMedico,
            "generoMedico": this.registerForm.value.generoMedico,
            "cedulaMedico": this.registerForm.value.cedulaMedico,
            "telefonoMedico": this.registerForm.value.telefonoMedico,
            "usuario": {
                "nombreUsuario": this.registerForm.value.nombreUsuario,
                "email": this.registerForm.value.email,
                "password": this.registerForm.value.password,
                "roles": [
                  {
                    "id": 3,
                    "rolNombre": "ROLE_MEDICO"
                  }
                ]
            }
          }
          console.info(medico_register);
          this.medicoService.save(medico_register).subscribe(
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
    }
    /*this.medico = new Medico(this.nombreMedico, this.generoMedico, this.especialidadMedico, this.cedulaMedico, this.telefonoMedico, this.usuario);
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.email, this.password, this.roles);
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
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      () => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(this.nuevoUsuario);
        console.log(err.error.message);
      }
    );*/
  }

  async onUpdate(id: number) {
    if(this.registerForm.value.password !=
      this.registerForm.value.repassword){
        const toast = await this.toastr.error('Fail', 'Password y Repetir Password no son iguales',{
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        return false;
      }else{
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

}
