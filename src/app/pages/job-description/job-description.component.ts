import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobAlert } from 'src/app/entity/job-alert';
import { JobAlertService } from 'src/app/service/job-alert.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent {

  id: number = 0
  jobAlert: JobAlert = new JobAlert
  constructor(private activatedRoute: ActivatedRoute, private jobAlertService: JobAlertService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params[('id')]
    this.jobAlertService.getJob(this.id).subscribe(
      (data) => {
        this.jobAlert = data
      }
    )
  }
}
