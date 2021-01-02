import { Component, OnInit, OnDestroy } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: [],
  providers: [SharedService],
})
export class ImageCaptureComponent implements OnInit, OnDestroy {
  video;
  canvas;
  streamStarted: boolean = false;
  stream;
  
  rearCamera: boolean = true;

  constructor(
    private titleService: Title,
    private router: Router,
    private shared: SharedService,
  ) {
      this.titleService.setTitle('PicUp | Image Capture');
    }
  
  ngOnInit(): void {
    if (!this.shared.isMobileDevice()) {
      this.router.navigate(['/']);
    }
    else{
      this.initCamera();
    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  initCamera = () => {
    this.video = document.getElementById("video");
    let constraints = {
      audio: false,
      video: {
        facingMode: !this.rearCamera ? "user" : "environment"
      }
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.streamStarted = true;
        this.video.srcObject = stream;
        this.stream = stream;
      })
      .catch((err0r) => {
        this.handleError(err0r);
      });
  }

  handleError = (error) => {
    if (error.name.includes("NotAllowedError")) {
      console.log("Browser does not have access to camera.");
    }
  }

  captureImage = () => {
    this.canvas = document.querySelector(".shot");
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    this.canvas.getContext("2d").drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    $('.modal').modal('show');
  }

  saveImage = () => {
    const imgURL = this.canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imgURL;
    downloadLink.download = 'image.png';
    downloadLink.click();
    $('.modal').modal('hide');

    this.router.navigate(['/']);
    this.shared.setMsg('success', 'You can upload the saved image now.', null);
  }

  switchCameras = () => {
    this.rearCamera = !this.rearCamera;
    this.stopCamera();
    this.initCamera();
  }

  stopCamera = () => {
    if (this.stream) {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  }
}
