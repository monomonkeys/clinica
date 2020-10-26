import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  isRecepcionista = false;
  isMedico = false; 
  
  nombreUsuario = '';
  roles: string[];

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();
      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {
        if( rol === 'ROLE_ADMIN'){
          this.isAdmin = true;
        }
        else if( rol === 'ROLE_MEDICO'){
          this.isMedico = true;
        }
        else if( rol === 'ROLE_RECEPCIONISTA'){
          this.isRecepcionista = true;
        }
      });
    }
    /*if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();
      this.authorities = this.tokenService.getAuthorities();
      if(this.authorities [0] === 'ROLE_ADMIN' || this.authorities [1] === 'ROLE_ADMIN'){
        console.log('esAdmin')
        this.isAdmin = true;
      }
<<<<<<< HEAD
      else if(this.authorities [0] === 'ROLE_MEDICO'){
=======
      else if(this.authorities [0] === 'ROLE_MEDICO' || this.authorities [1] === 'ROLE_MEDICO'){
>>>>>>> 3970a86... registro usuarios
        console.log('esMedico')
        this.isMedico = true;
      }
      else if(this.authorities [0] === 'ROLE_RECEPCIONISTA' || this.authorities [1] === 'ROLE_RECEPCIONISTA'){
        console.log('esRecepcionista')
        this.isRecepcionista = true;
      } else {
        console.log('esUsuario')
      }
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
      this.authorities = [];
    }*/
  }

}
