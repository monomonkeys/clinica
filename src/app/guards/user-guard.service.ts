import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    if(this.tokenService.isAdmin() == true){
      this.realRol = 'admin';
    }else if(this.tokenService.isMedico() == true){
      this.realRol = 'medico';
    }else if(this.tokenService.isRecepcionista() == true){
      this.realRol = 'recepcionista';
    }else{
      this.realRol = 'user';
    }
    /*this.realRol = this.tokenService.isMedico() ? 'medico' : 'user';
    this.realRol = this.tokenService.isRecepcionista() ? 'recepcionista' : 'user';*/
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

