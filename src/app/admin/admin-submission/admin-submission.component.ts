import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stat } from 'fs';
import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
declare let Swiper: any;
@Component({
  selector: 'app-admin-submission',
  templateUrl: './admin-submission.component.html',
  styleUrls: ['./admin-submission.component.scss']
})
export class AdminSubmissionComponent implements OnInit, AfterViewInit {

  status = 'Unreviewed';
  review = '';
  id!: number;
  taskId!: number;
  submitedTask: StudentTaskSubmittion = new StudentTaskSubmittion;
  submitedTasksList: StudentTaskSubmittion[] = [];
  index: number = 0

  constructor(private taskService: TaskServiceService,
    private activateRoute: ActivatedRoute,) { }

  async ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['submissionId'];
      this.taskId = params['taskId']
    });

    // try {
    //   const data = await this.getTaskSubmission();

    //   if (this.submitedTask.status == this.status) {
    //     this.updateSubmitedTaskStatus('Reviewing');
    //   }
    // } catch (error: any) {
    //   console.log(error.error.message);

    // }
    this.getAllTaskSubmission()
  }

  // public async getTaskSubmission() {
  //   try {
  //     const data: any = await this.taskService.getSubmissionTaskById(this.id).toPromise();
  //     this.submitedTask = data.submission;
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  public updateSubmitedTaskStatus(status: string) {
    this.taskService.updateSubmitedTaskStatus(this.id.toString(), status, this.review).subscribe({
      next: (data: any) => {
        this.submitedTask = data;
        if (status != 'Reviewing') {
          this.removeTaskFromList(this.index)
        }
      }
    })

  }

  ngAfterViewInit() {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev"
      },
    });

  }

  getAllTaskSubmission() {
    this.taskService.getAllTaskSubmissionBYTaskId(this.taskId).subscribe({
      next: (data: any) => {

        this.submitedTasksList = data
        const index = this.submitedTasksList.findIndex(obj => obj.submissionId == this.id);
        if (index !== -1) {
          const res = { ...this.submitedTasksList[index] as StudentTaskSubmittion };
          this.submitedTasksList.splice(index, 1);
          this.submitedTasksList.unshift(res);

          this.updateSubmitedTaskStatus('Reviewing');
        }
      },
      error: (er: any) => {
      }
    })
  }
  removeTaskFromList(index: number) {
    this.submitedTasksList.splice(index, 1);
  }
}
