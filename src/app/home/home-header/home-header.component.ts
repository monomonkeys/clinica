import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  isLogged = false;
  isAdmin = false;
  isMedico = false;
  isRecepcionista = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isMedico = this.tokenService.isMedico();
    this.isRecepcionista = this.tokenService.isRecepcionista();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

}

