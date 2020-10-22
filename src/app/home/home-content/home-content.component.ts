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
  authorities = [];

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();
      this.authorities = this.tokenService.getAuthorities();
      if(this.authorities [0] === 'ROLE_ADMIN'){
        console.log('esAdmin')
        this.isAdmin = true;
      }
      else if(this.authorities [1] === 'ROLE_MEDICO'){
        console.log('esMedico')
        this.isMedico = true;
      }
      else if(this.authorities [1] === 'ROLE_RECEPCIONISTA'){
        console.log('esRecepcionista')
        this.isRecepcionista = true;
      } else {
        console.log('esUsuario')
      }
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
      this.authorities = [];
    }
  }

}
