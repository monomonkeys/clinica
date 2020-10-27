import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { UserGuardService as guard } from './guards/user-guard.service';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component:  LoginComponent },
  { path: 'lista', component:  ListaUsuarioComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  { path: 'detalle/:id', component:  DetalleUsuarioComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  { path: 'editar/:id', component:  EditarUsuarioComponent,  canActivate: [guard], data: { expectedRol: ['admin'] }},
  { path: 'home', component:  HomeComponent },
  { path: 'register', component:  RegisterComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
