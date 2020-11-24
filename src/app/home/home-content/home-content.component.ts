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
  isMedico = false;
  isRecepcionista = false;
  
  nombreUsuario: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.nombreUsuario = this.tokenService.getUserName();
    this.isAdmin = this.tokenService.isAdmin();
    this.isMedico = this.tokenService.isMedico();
    this.isRecepcionista = this.tokenService.isRecepcionista();
  }

}
