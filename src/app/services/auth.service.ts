import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;
  baseUrl = environment.baseUrl +'/api';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken'),
  });
  

  constructor(private _router: Router,
  						private http: HttpClient) { }

  
  authenticate(email: string, pass: string): Observable<any> {
    return this.http.post(this.baseUrl + '/login/',
	    {"email": email, "password": pass }, {headers: this.httpHeaders});
	 }


	isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
	}

	// simulate jwt token is valid
  isTokenExpired(): boolean {
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    this._router.navigate(['/login']);
  }

  logoutWithoutRedirect() {
    localStorage.removeItem("token");
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }
}
