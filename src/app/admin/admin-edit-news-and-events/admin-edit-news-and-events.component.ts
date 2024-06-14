import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { NewsAndEventRequest } from 'src/app/payload/news-and-event-request';
import { NewsEventServiceService } from 'src/app/service/news-event-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-admin-edit-news-and-events',
  templateUrl: './admin-edit-news-and-events.component.html',
  styleUrls: ['./admin-edit-news-and-events.component.scss']
})
export class AdminEditNewsAndEventsComponent implements OnInit {

  id: number = 0;
  newsAndEventRequest: NewsAndEventRequest = new NewsAndEventRequest();
  imageName: string = '';
  imagePreview: string = '';
  isSubmit:boolean=false;

  constructor(private newsAndEventService: NewsEventServiceService,
    private activateRoute: ActivatedRoute, private router: Router,
    private tosterService: ToastService) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params[('id')];
    this.getNewsAndEventById();
  }

  updateNewsAndEvent() {
    this.isSubmit=true
    this.newsAndEventService.updateNewsAndEvent(this.newsAndEventRequest).subscribe(
      {
        next: (data: any) => {
          this.newsAndEventRequest = data;
          this.tosterService.showSuccess('SuccessFully Updated!!', 'Success')
          this.router.navigate(['/admin/newsAndEvent'])
        },
        error: (er: any) => {
          this.isSubmit=false
        }
      }
    )
  }

  getNewsAndEventById() {
    this.newsAndEventService.getByNewsById(this.id).subscribe(
      (data: any) => {
        this.newsAndEventRequest = data;
        this.newsAndEventRequest.fileName = data.image
        this.imagePreview = this.newsAndEventRequest.fileName
      }
    )
  }

  addMedia(event: any) {
    this.newsAndEventRequest.file = event.target.files[0];

  }

  public addImage(event: any) {
    this.newsAndEventRequest.fileName = event.target.files[0];
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
    this.newsAndEventRequest.fileName = '';
  }
}