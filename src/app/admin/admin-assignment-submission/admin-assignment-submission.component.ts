import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { id } from 'date-fns/locale';
import { AssignmentSubmission } from 'src/app/entity/assignment-submission';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
declare var Swiper: any;
@Component({
  selector: 'app-admin-assignment-submission',
  templateUrl: './admin-assignment-submission.component.html',
  styleUrls: ['./admin-assignment-submission.component.scss']
})
export class AdminAssignmentSubmissionComponent implements OnInit {

  submitedAssignment: AssignmentSubmission[] = [];
  review = '';
  status = 'Unreviewed';
  submissionId!: number;
  assignmentId: any;
  index: number = 0;
  taskReviewed: any[] = []

  constructor(private activateRoute: ActivatedRoute,
    private assignmentService: AssignmentServiceService,
    private route:Router
    ) {

    this.activateRoute.queryParams.subscribe(params => {
      this.submissionId = params['submissionId'];
      this.assignmentId = params['assignmentId'];
    });
  }

  ngOnInit(): void {
    this.getAllSubmittedAssignmentTask();
  }



  reviewTask(submissionId: number) {
    // this.updateSubmitAssignmentStatus()
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
      on: {
        slideChange: () => {
          let isPresentIndex = this.taskReviewed.findIndex(index => index === swiper.activeIndex);
          console.log(isPresentIndex);
          let assignment = this.submitedAssignment[swiper.activeIndex];
          if (isPresentIndex === -1 && assignment.status != 'Reviewing') {
            this.submissionId = this.submitedAssignment[swiper.activeIndex].submissionId;
            this.updateSubmitAssignmentStatus('Reviewing');
            assignment.status = 'Reviewing'
            this.taskReviewed.push(swiper.activeIndex);
          }
        }
      }
    });
  }

  updateSubmitAssignmentStatus(status: string) {
    this.review = ''
    this.assignmentService.updateSubmitAssignmentStatus(this.submissionId, status, this.review).subscribe({
      next: (data: any) => {
        if (status != 'Reviewing') {
          this.removeTaskFromList()
        }
        if(this.submitedAssignment.length===0)
          this.route.navigate(['admin/assignments']);
      }
    })
  }

  removeTaskFromList() {
    let el = document.getElementsByClassName('swiper-slide')
    console.log(el);
    el[this.index].remove();
    this.submitedAssignment.splice(this.index, 1);
    setTimeout(() => {
      this.ngAfterViewInit();
      let el = document.getElementsByClassName('swiper-slide')
      console.log(el);
    }, 100);
  }

  getAllSubmittedAssignmentTask() {
    this.assignmentService.getAllSubmittedAssignmentTask(this.assignmentId).subscribe({
      next: (data: any) => {
        this.submitedAssignment = data;
        const index = this.submitedAssignment.findIndex(obj => obj.submissionId == this.submissionId);
        if (index !== -1) {
          const res = { ...this.submitedAssignment[index] as AssignmentSubmission };
          this.submitedAssignment.splice(index, 1);
          this.submitedAssignment.unshift(res);
        }
        if (this.submitedAssignment[index].status != 'Accepted')
          this.updateSubmitAssignmentStatus('Reviewing')
      },
      error: (er: any) => {
        console.log(er.error.message);
      }
    })
  }

}
