import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {  
  registerForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    nombreUsuario: new FormControl('',[Validators.minLength(4), Validators.required]),
    password: new FormControl('',[Validators.minLength(4), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    roles: new FormControl('',Validators.required)
  })

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  isLogged = false;
  roles: string[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password, this.roles);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      () => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        

        this.router.navigate(['/register']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(this.nuevoUsuario);
        console.log(err.error.message);
      }
    );
  }

}

