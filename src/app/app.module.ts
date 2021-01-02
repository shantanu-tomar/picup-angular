import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/auth/login.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { SignupComponent } from './components/auth/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from "./services/auth-guard.service";
import { ApiService } from "./services/api.service";
import { SharedService } from "./services/shared.service";
import { ImagesComponent } from './components/images/images.component';
import { ImageDetailComponent } from './components/images/image-detail.component';
import { ImageDetailGuard } from 'src/app/services/image-detail-guard.service';
import {ImageCaptureComponent} from './components/images/image-capture.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImagesComponent,
    ImageDetailComponent,
    ImageCaptureComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard, ApiService, SharedService, ImageDetailGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
