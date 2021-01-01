import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
  providers: [ApiService, SharedService ],
})
export class ImagesComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private titleService:Title,
    private shared: SharedService,
    private router: Router,
  ) {
      this.titleService.setTitle('PicUp | Upload images');
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({imageSelect: ['']});
  }

  uploadImage = () => {
    const formData = new FormData();
    formData.append("image", this.form.get('imageSelect').value);
    
    document.getElementById('spinnerOverlay').style.display = 'block';
    this.api.uploadImage(formData).subscribe(
      response => {
        document.getElementById('spinnerOverlay').style.display = 'none';
        this.router.navigate(['/detail'], {state: { data: response} });
      },
      error => {
        console.log(error);
        document.getElementById('spinnerOverlay').style.display = 'none';
        this.shared.displayErrorMsg(error);
      }
    )
  }

  fileUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imageSelect').setValue(file);
    }
  }
}
