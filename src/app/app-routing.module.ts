import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { UserGuardService as guard, UserGuardService } from './guards/user-guard.service';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';
import { ListaServicioComponent } from './servicio/lista-servicio.component';
import { DetalleServicioComponent } from './servicio/detalle-servicio.component';
import { EditarServicioComponent } from './servicio/editar-servicio.component';
import { RegistrarServicioComponent } from './servicio/registrar-servicio.component';
import { ListaAreaComponent } from './area/lista-area.component';
import { DetalleAreaComponent } from './area/detalle-area.component';
import { EditarAreaComponent } from './area/editar-area.component';
import { RegistrarAreaComponent } from './area/registrar-area.component';
import { ListaPacienteComponent } from './paciente/lista-paciente.component';
import { LoginGuard } from './guards/login.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { MedicoComponent } from './medico/medico.component';
import { FechaComponent } from './fecha/fecha.component';
import { CitaComponent } from './cita/cita.component';
import { NuevaCitaComponent } from './nuevaCita/nueva-cita/nueva-cita.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component:  LoginComponent, canActivate: [LoginGuard] },
  { path: 'lista', component:  ListaUsuarioComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'listaServicio', component:  ListaServicioComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'listaArea', component:  ListaAreaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'listaPaciente', component:  ListaPacienteComponent, canActivate: [UserGuardService], data: { expectedRol: ['medico', 'admin'] }},
  { path: 'medico', component: MedicoComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'fecha', component: FechaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},  
  { path: 'cita', component: CitaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin', 'medico', 'recepcionista'] }}, 
  { path: 'nuevaCita', component: NuevaCitaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin', 'medico', 'recepcionista'] }}, 
  { path: 'detalle/:id', component:  DetalleUsuarioComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'detalleServicio/:id', component:  DetalleServicioComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'detalleArea/:id', component:  DetalleAreaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'editar/:id', component:  EditarUsuarioComponent,  canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'editarServicio/:id', component:  EditarServicioComponent,  canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'editarArea/:id', component:  EditarAreaComponent,  canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'home', component:  HomeComponent },
  { path: 'calendario', component:  CalendarComponent },
  { path: 'register', component:  RegisterComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'registerServicio', component:  RegistrarServicioComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: 'registerArea', component:  RegistrarAreaComponent, canActivate: [UserGuardService], data: { expectedRol: ['admin'] }},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
