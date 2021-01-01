import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = environment.baseUrl +'/api';
  user: object;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken'),
  });
  
  constructor(private http: HttpClient) { }

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

  getHome(): Observable<any> {
    return this.http.get(this.baseUrl, {headers: this.httpHeaders});
  }

  register(data): Observable<any> {
    return this.http.post(
      this.baseUrl + '/signup/', data, {headers: this.httpHeaders});
  }

  uploadImage(formData): Observable<any>{
    return this.http.post(this.baseUrl +'/upload/', formData);
  }
}