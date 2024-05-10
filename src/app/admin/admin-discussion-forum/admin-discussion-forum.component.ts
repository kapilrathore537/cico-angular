import { Component, OnInit } from '@angular/core';
import { StudentDetails } from 'src/app/entity/student-details';
import { CommentResponse } from 'src/app/payload/comment-response';
import { DiscussionFormResponse } from 'src/app/payload/discussion-form-response';
import { DiscussionFormServiceService } from 'src/app/service/discussion-form-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-discussion-forum',
  templateUrl: './admin-discussion-forum.component.html',
  styleUrls: ['./admin-discussion-forum.component.scss']
})
export class AdminDiscussionForumComponent implements OnInit {

  discussionFormResponse: DiscussionFormResponse[] = [];
  temp: DiscussionFormResponse[] = [];
  commentResonse: CommentResponse[] = [];
  newDiscussion: DiscussionFormResponse = new DiscussionFormResponse
  student: StudentDetails = new StudentDetails


  ngOnInit(): void {
    this.getAllDiscussion();
  }

  constructor(private discussionFormSerice: DiscussionFormServiceService, public utilityService: UtilityServiceService
    , private tost: ToastService
  ) { }

  public getAllDiscussion() {
    this.discussionFormSerice.getAllDiscussionForm(0).subscribe((
      (data: any) => {
        this.discussionFormResponse = data.response
        this.temp = { ...this.discussionFormResponse }
      }
    ))
  }

  public getDaysDifference(createdDate: any): number {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - new Date(createdDate).getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return Math.floor(differenceInDays); // Round down to the nearest integer
  }


  public removeComments(discussionFormId: number, commentsId: number) {

    this.tost.showSuccess('Comment Is Deleted Successfully!', 'Success')
    this.discussionFormSerice.removeComment(discussionFormId, commentsId).subscribe({
      next: (data: any) => {
        this.newDiscussion.comments = data.comments
      }
    })

  }
  search: string = ''
  searching() {
    this.discussionFormSerice.search(this.search).subscribe({
      next: (data: any) => {
        if (this.search == null || this.search == '') {
          this.discussionFormResponse = { ...this.temp }
        } else {
          this.discussionFormResponse = data
        }
      },
      error: (er: any) => {
      }
    })
  }
}
