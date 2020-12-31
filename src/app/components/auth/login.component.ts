import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService, SharedService]

})
export class LoginComponent implements OnInit {
	public email: string;
  public password: string;
  public userAuthToken: string;
  nextRoute = '/';

  constructor(private auth: AuthService,
    					private router: Router,
              private route: ActivatedRoute,
              private shared: SharedService,
              private titleService:Title,
  ) {
        this.titleService.setTitle('Login | PicUp');
     }


  ngOnInit(): void {
    if (!this.auth.isAuthenticated()){
      this.route.queryParams.subscribe(params => {
        if (params['next'] != undefined){
          this.nextRoute = params['next'];
        }
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  authenticate = (form: NgForm) => {
    if (form.valid) {
      document.getElementById('spinnerOverlay').style.display = 'block';
  		this.performAuthentication();
    }
    else {
      this.shared.setMsg('danger', 'Authentication Failed.', null);
    }
  }

  demoLogin = () => {
    this.email = 'sherlock@bakerstreet.com';
    this.password = 'demo';

    this.performAuthentication();
  }

  demoLoginScroll = () => {
    this.shared.scrollToDiv('sampleLoginDiv', 500, null);
  }

  performAuthentication = () => {
    this.auth.authenticate(this.email, this.password).subscribe(

      response => {
        document.getElementById('spinnerOverlay').style.display = 'none';
        localStorage.setItem("token", response.token);
        this.router.navigate([`/${this.nextRoute}`]);
      },

      error => { 
        console.log(error);
        if (error.error.non_field_errors) {
          for (let e of error.error.non_field_errors){
            this.shared.setMsg(
            'danger', e, null);
          }
        }
        else {
          this.shared.setMsg(
          'danger', "An error occured. Please retry.", null);
        }
        document.getElementById('spinnerOverlay').style.display = 'none';
      }
    )
  }

  logout() {
    this.auth.logout();
  }
}
