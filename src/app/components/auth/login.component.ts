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
	public username: string;
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
    this.username = 'sherlock';
    this.password = 'demo';

    this.performAuthentication();
  }

  demoLoginScroll = () => {
    this.shared.scrollToDiv('sampleLoginDiv', 500, null);
  }

  performAuthentication = () => {
    this.auth.authenticate(this.username, this.password).subscribe(

      response => {
        document.getElementById('spinnerOverlay').style.display = 'none';
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        this.router.navigate([`/${this.nextRoute}`]);
        this.shared.refreshAppComponent();
      },

      error => { 
        console.log(error);
        this.shared.displayErrorMsg(error);
        document.getElementById('spinnerOverlay').style.display = 'none';
      }
    )
  }

  logout() {
    this.auth.logout();
  }
}
