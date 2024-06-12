import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsAndEventRequest } from 'src/app/payload/news-and-event-request';
import { NewsEventServiceService } from 'src/app/service/news-event-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-news-and-events',
  templateUrl: './admin-create-news-and-events.component.html',
  styleUrls: ['./admin-create-news-and-events.component.scss']
})
export class AdminCreateNewsAndEventsComponent implements OnInit {

  newRequest: NewsAndEventRequest = new NewsAndEventRequest();
  newsAndEventForm: FormGroup;

  imagePreview: string = '';
  imageName: string = '';
  isSubmit:boolean=false;

  ngOnInit(): void {

  }

  constructor(private newsEventService: NewsEventServiceService, private router: Router, private formBuilder: FormBuilder) {
    this.newsAndEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDesc: ['', Validators.required],
      briefDesc: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  isFieldInvalidForNewsAndEventDetailsForm(fieldName: string): boolean {
    const field = this.newsAndEventForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public jobDetailsFormSubmition() {
    AppUtils.submissionFormFun(this.newsAndEventForm)
  }


  createNewsAndEvent() {
    this.newsAndEventForm.markAllAsTouched();
    if (this.newsAndEventForm.valid){
      this.isSubmit=true
      this.newsEventService.createNewsAndEvent(this.newRequest).subscribe(
        (data: any) => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'News Add success !!'
          }).then(e => {
            this.newRequest = new NewsAndEventRequest
            this.router.navigate(['/admin/newsAndEvent']);
          })
        },
        (err) => {
          this.isSubmit=false
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'error',
            title: 'Registration failed !!'
          })
        }
      )
    }
  }
  // addImage(event:any){
  //   this.newRequest.fileName=event.target.files[0];
  //    console.log(this.newRequest.fileName);
  //    console.log('hii');


  // }


  addMedia(event: any) {
    this.newRequest.fileName = event.target.files[0];

  }

  imageSrc: any = null;  // Initialize with null

  // loadFile(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.newRequest.fileName=e.target.result;
  //       this.imageSrc = this.newRequest.fileName;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // addImage(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.newRequest.fileName=event.target.files[0];
  //       this.imageSrc=this.newRequest.fileName
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  public addImage(event: any) {
    this.newRequest.fileName = event.target.files[0];

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.imageName = selectedFile.name;
      };

      reader.readAsDataURL(selectedFile);
    } else {
      this.imagePreview = '';
      this.imageName = '';
    }
  }

  public removeImage(file:HTMLInputElement) {
    file.value = '';
    this.imagePreview = '';
    this.imageName = '';
    this.newRequest.fileName = '';
  }


}
