import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from "@angular/forms";
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, AuthService],

})
export class AppComponent implements OnInit{
  title = 'PicUp';
  offline: boolean = false;

  spinner: boolean;
  isAuthenticated: boolean;
  
  messages = [];
  toast: object;
  
  username: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ){
    this.setVars();
    }

  ngOnInit(): void {
    this.createOnline$().subscribe(
      isOnline => {
        if (!isOnline) {
          this.offline = true;
        }
        else {
          this.offline = false;
        }
      }
    );
  }

  setUser = () => {
    this.username = JSON.parse(localStorage.getItem("username"));
  }

  setVars = () => {
    if (this.auth.isAuthenticated()){
      this.setUser();
      this.isAuthenticated = true;
    }
    
    if(sessionStorage.getItem('theme')) {
      document.getElementById("body").className = sessionStorage.getItem('theme');
    }
  }

  themeToggle = (theme) => {
    sessionStorage.setItem('theme', theme);
    document.getElementById('body').className = theme;
  }

  navLogin = () => {
    let nextUrl = (this.router.routerState.snapshot.url).replace('/', '');
    this.router.navigate(['/login'], {queryParams: {"next": nextUrl}});
  }

  logout = () => {
    this.auth.logout();
    this.isAuthenticated = false;
  }

  loginModal = () => {
    $('#loginModal').modal();
  }

  loginModalSubmit = (form: NgForm) => {
    if (form.valid) {
      $('#loginModal').modal('hide');

      this.auth.authenticate(
        form.value['username'], form.value['password']).subscribe(
          response => {
            localStorage.setItem("token", response.token);
            this.setVars();
          },

          error => { 
            this.setMsg(
            'danger', `Error ${error.status}: ${error.statusText}`, null)
          }
      )
    }
    else {
      this.setMsg('danger', 'Authentication Failed.', null);
    }
  }

  setMsg = (colour: string, text: string, title: string) => {
    this.messages.push({
      "colour": colour,
      "title": title,
      "text": text,
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
