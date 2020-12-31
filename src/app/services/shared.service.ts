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
}
