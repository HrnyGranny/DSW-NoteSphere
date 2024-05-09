import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento
import { CKEditorModule } from 'ckeditor4-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';  // Importa RegisterComponent

// Importa los servicios
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,  // Declara RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importa el módulo de enrutamiento
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  // Añade ReactiveFormsModule a la lista de imports
    CKEditorModule,
    BrowserAnimationsModule, // required animations module
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }