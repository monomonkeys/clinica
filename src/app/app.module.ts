import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProvider } from './interceptors/user-interceptor.service';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario.component';
import { RegistrarServicioComponent } from './servicio/registrar-servicio.component';
import { ListaServicioComponent } from './servicio/lista-servicio.component';
import { DetalleServicioComponent } from './servicio/detalle-servicio.component';
import { EditarServicioComponent } from './servicio/editar-servicio.component';
import { EditarAreaComponent } from './area/editar-area.component';
import { RegistrarAreaComponent } from './area/registrar-area.component';
import { ListaAreaComponent } from './area/lista-area.component';
import { DetalleAreaComponent } from './area/detalle-area.component';
import { ListaPacienteComponent } from './paciente/lista-paciente.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MedicoComponent } from './medico/medico.component';
import { FechaComponent } from './fecha/fecha.component';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    HomeFooterComponent,
    RegisterComponent,
    ListaUsuarioComponent,
    DetalleUsuarioComponent,
    EditarUsuarioComponent,
    RegistrarServicioComponent,
    ListaServicioComponent,
    DetalleServicioComponent,
    EditarServicioComponent,
    EditarAreaComponent,
    RegistrarAreaComponent,
    ListaAreaComponent,
    DetalleAreaComponent,
    ListaPacienteComponent,
    ConfirmDialogComponent,
    CalendarComponent,
    MedicoComponent,
    FechaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
