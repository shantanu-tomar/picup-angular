import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router';


@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: [],
  providers: [],
})
export class ImageDetailComponent implements OnInit {
  name: string;
  url: string;

  constructor(
    private titleService: Title,
    private router: Router,
  ) {
      this.titleService.setTitle('PicUp | Image Detail');
    }
  
  ngOnInit(): void {
    try {
      this.name = history.state.data['name'];
      this.url = history.state.data['image'];
    }
    catch(err) {
      this.router.navigate(['/']);
    }
    finally {}
  }
}
