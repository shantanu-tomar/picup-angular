import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { SignupComponent } from './components/auth/signup.component';
import { ImagesComponent } from './components/images/images.component';
import {ImageDetailComponent} from './components/images/image-detail.component';

import { AuthGuard } from 'src/app/services/auth-guard.service';
//import { ImageDetailGuard } from 'src/app/services/image-detail-guard.service';


const routes: Routes = [
  { path: '', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'detail', component: ImageDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})

export class AppRoutingModule { }
