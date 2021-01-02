import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private app: AppComponent, private router: Router) { }

  setMsg = (colour: string, text: string, title: string ) => {
    this.app.setMsg(colour, text, title);
  }

  spinner = (state: boolean) => {
    this.app.spinner = state;
  }

  scrollToDiv = (id, time, offset) => {
    $('html, body').animate({
      scrollTop: $(`#${id}`).offset().top - offset
    }, time);
  }

  isOnline = () => {
    return !this.app.offline;
  }

  refreshAppComponent = () => {
    this.app.setVars();
  }

  displayErrorMsg = (error) => {
    Object.values(error.error).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((msg) => {
          this.setMsg('danger', msg, null);
        })
      }
      else if (typeof(value) == "string") {
        this.setMsg('danger', value, null);
      }
      else {
        this.setMsg('danger', "An error occurred.", null);
      }
    });
  }

  isMobileDevice = () => {
    if( /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
    return false;
  }
}
