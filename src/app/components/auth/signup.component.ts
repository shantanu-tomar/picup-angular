import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers:[ApiService, SharedService]

})
export class SignupComponent implements OnInit {
	public username: string;
  public password: string;
  public password2: string;
  public userAuthToken: string;
  public message = { };


  constructor(private api: ApiService,
    					private router: Router,
              private shared: SharedService,
              private titleService:Title,

    ) {
        this.titleService.setTitle('Signup | PicUp');

     }

  ngOnInit(): void {
  }

  signup(form: NgForm) {
    if (form.valid) {
      document.getElementById('spinnerOverlay').style.display = 'block';
      // perform authentication
      let data = {
        "username": form.value["username"],
        "password": form.value["password"],
        "password2": form.value["password2"]
      };

      this.api.register(data).subscribe(

        response => {
          if (response) {
            document.getElementById('spinnerOverlay').style.display = 'none';
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", JSON.stringify(response.username));
            this.router.navigate(['/']);
            this.shared.refreshAppComponent();
          }
        },

        error => {
          this.shared.displayErrorMsg(error);
          document.getElementById('spinnerOverlay').style.display = 'none';
        }
      )
    }
    else {
      this.shared.setMsg('danger', 'User registration failed.', null);
    }
  }

}
  
