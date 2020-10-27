import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
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

  borrar(id: number) {
    this.usuarioService.delete(id).subscribe(
      data => {
        this.toastr.success('Usuario Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarUsuarios();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  registrarUsuario(): void {
    this.router.navigate(['/register']);
  }

}
