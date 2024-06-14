// import { Component, OnInit } from '@angular/core';
// import { StudentDetails } from 'src/app/entity/student-details';
// import { CommentResponse } from 'src/app/payload/comment-response';
// import { DiscussionFormResponse } from 'src/app/payload/discussion-form-response';
// import { DiscussionFormServiceService } from 'src/app/service/discussion-form-service.service';
// import { LoginService } from 'src/app/service/login.service';
// import { StudentService } from 'src/app/service/student.service';
// import { UtilityServiceService } from 'src/app/service/utility-service.service';
// import { LikeResponse } from 'src/app/payload/like-response';
// import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';
// import { CommentResponseForm } from 'src/app/payload/comment-response-form';
// import { LikeResponseForm } from 'src/app/payload/like-response-form';
// import { Typing } from 'src/app/entity/typing';
// import { ToastService } from 'src/app/service/toast.service';
// import { LoaderServiceService } from 'src/app/service/loader-service.service';
// import { DiscussionFormEnum } from 'src/app/enum/discussion-form-enum';
// import { defaultUrlMatcher } from '@angular/router';
// import { ChatmessageService } from 'src/app/service/chatmessage.service';

// @Component({
//   selector: 'app-discussion-forum',
//   templateUrl: './discussion-forum.component.html',
//   styleUrls: ['./discussion-forum.component.scss']
// })
// export class DiscussionForumComponent implements OnInit {

//   discussionFormList: DiscussionFormResponse[] = []
//   student: StudentDetails = new StudentDetails
//   comment: string = ''
//   commentResponse: CommentResponse = new CommentResponse
//   likeResponse = new LikeResponse
//   discussionFormResponse: DiscussionFormResponse = new DiscussionFormResponse
//   discussionForm = new DiscussionFormResponse
//   commnetVisibility: boolean[] = []
//   message!: string;
//   typing: Typing[] = []
//   isMessageSend: Boolean = false;
//   isMessagLoading: boolean = false
//   studentId!: number

//   constructor(private discussionFormSerice: DiscussionFormServiceService,
//     private loginService: LoginService,
//     private utilityService: UtilityServiceService,
//     private studentService: StudentService,
//     private webSocketService: WebsocketServiceDiscussionFormService,
//     private toast: ToastService,
//     private loaderService: LoaderServiceService,
//     private chatServiceSocketIo: ChatmessageService
//   ) {

//     const message = { 'name': 'rohan', 'text': 'I am rohan', 'type': 'saveData' };
//     this.chatServiceSocketIo.sendMessage(message, 'send_message');
//   }

//   ngOnInit(): void {
//     this.getAllForms()
//     this.getStudent();
//     this.connect();
//     this.studentId = this.loginService.getStudentId()
//   }

//   public getAllForms() {
//     this.isMessagLoading = true;
//     this.loaderService.show()
//     this.discussionFormSerice.getAllDiscussionForm(this.loginService.getStudentId()).subscribe(
//       {
//         next: (data: any) => {
//           this.discussionFormList = data.response
//           this.isMessagLoading = false
//           this.loaderService.hide()
//         },
//         error: (er) => {
//           this.loaderService.hide()
//           alert('something went wrong...')
//         }
//       }
//     )
//   }

//   // creaeting like
//   public like(discussionFormId: number) {
//     this.loaderService.show()
//     this.discussionFormSerice.addOrRemoveLike(this.loginService.getStudentId(), discussionFormId).subscribe(
//       {
//         next: (data: any) => {
//           this.loaderService.hide()
//           console.log('like--', data);
//           switch (data.type) {
//             case DiscussionFormEnum.likeResponse:
//               let form = this.discussionFormList.find(obj => obj.id == discussionFormId) as DiscussionFormResponse;

//               if (form && data.likeId && !form.likes.find(o => o.id === data.likeId || data.likeId === undefined)) {
//                 let newLike = new LikeResponse();
//                 newLike.id = data.likeId;
//                 form.likes.push(newLike);
//               }
//               if (this.studentId == data.studentId) {
//                 form.isLike = data.isLike;
//               }
//               break;
//             case DiscussionFormEnum.removeLike:
//               let form2 = this.discussionFormList.find(obj => obj.id == discussionFormId) as DiscussionFormResponse;
//               let likeIndex = form2.likes.findIndex(like => like.id == data.likeId);
//               if (likeIndex !== -1) {
//                 form2.likes.splice(likeIndex, 1);
//                 console.log('Like removed');
//               }
//               if (this.loginService.getStudentId() == data.studentId) {
//                 form2.isLike = false;
//               }
//               break;
//             default:
//               console.log('unknown message type!!');

//           }

//           //this.sendMessage(new LikeResponseForm(discussionFormId, DiscussionFormEnum.likeResponse, data.likes, data.isLike, this.loginService.getStudentId()))
//         },
//         error: (er) => {
//           this.loaderService.hide()
//           alert('something went wrong...')
//         }
//       }
//     )
//   }

//   public getStudent() {
//     this.studentService.getByStudentById(this.loginService.getStudentId()).subscribe(
//       {
//         next: (data: any) => {
//           this.student = data
//         }
//       }
//     )
//   }
//   public date(date: any) {
//     return this.utilityService.updateTimeline(date)
//   }

//   //creating comment
//   public createComment(id: number) {
//     if (this.comment === '' || this.comment === ' ')
//       return
//     this.loaderService.show()
//     this.discussionFormSerice.creatCommnet(this.loginService.getStudentId(), id, this.comment).subscribe(
//       {
//         next: (data: any) => {
//           //let form = this.discussionFormList.find(obj => obj.id === id) as DiscussionFormResponse
//           //this.commentResponse = data
//           //  form.comments.push(this.commentResponse)
//           this.comment = ''
//           this.sendTypingUser('typed')
//           this.sendMessage(new CommentResponseForm(id, data.studentProfilePic, data.studentName, data.content, (data.createdDate).toString(), data.id, DiscussionFormEnum.commentResponse))
//           this.loaderService.hide()
//         },
//         error: (er) => {
//           this.toast.showSuccess('Already commented...', '')
//           this.loaderService.hide()
//         }
//       }
//     )
//   }

//   isTrue: boolean = false
//   public createDiscussionForm() {
//     if (this.isTrue) {
//       this.loaderService.show()
//       this.message = ''
//       this.isTrue = false
//       this.isMessageSend = true
//       this.discussionFormSerice.createDiscussionForm(this.student.studentId, this.discussionForm.content, this.discussionForm.file, this.discussionForm.audioFile).subscribe(
//         {
//           next: (data: any) => {
//             this.loaderService.hide()
//             this.discussionFormList.push(data);
//             this.discussionForm = new DiscussionFormResponse()
//           },
//           error: (er) => {
//             this.loaderService.hide()
//             alert('something went wrong...')
//           }
//         }
//       )
//     } else {
//       this.message = 'message can not be empty'
//       this.isTrue = false
//     }
//   }

//   public clearMessage() {
//     if (this.discussionForm.content !== null && this.discussionForm.content !== '' && this.message !== undefined) {
//       this.message = ''
//       this.isTrue = true
//     } else {
//       this.message = 'message can not be empty'
//       this.isTrue = false
//     }
//   }

//   public fileEvent(event: any) {

//     let file: File = event.target.files[0];
//     if (file.type.startsWith('audio') || file.type.startsWith('video')) {
//       this.discussionForm.audioFile = event.target.files[0];
//       event.target.value = '';
//     } else if (file.type.startsWith('image')) {
//       this.discussionForm.file = event.target.files[0];
//       event.target.value = '';
//     }
//   }

//   toggleComment(index: number): void {
//     this.commnetVisibility = [false]
//     this.commnetVisibility[index] = !this.commnetVisibility[index];
//   }
//   connect() {
//     this.webSocketService.getMessages().subscribe((message) => {
//       switch (message.type) {
//         case DiscussionFormEnum.commentResponse:
//           let form = this.discussionFormList.find(obj => obj.id === message.discussionFormId) as DiscussionFormResponse
//           if (form && !form.comments.find(c => c.id === message.id)) {
//             form.comments.unshift(message);
//           }
//           break;
//         case DiscussionFormEnum.removeCommen:
//           let forum = this.discussionFormList.find(obj => obj.id === message.discussionFormId) as DiscussionFormResponse
//           if (forum) {
//             let index = forum.comments.findIndex(obj1 => obj1.id === message.commentId)
//             if (index !== -1) {
//               forum.comments.splice(index, 1);
//             }
//           }
//           break;
//         case DiscussionFormEnum.likeResponse:

//           if (this.studentId != message.studentId) {
//             let form1 = this.discussionFormList.find(obj => obj.id == message.discussionFormId) as DiscussionFormResponse;
//             if (form1 && message.likeId && !form1.likes.find(o => o.id === message.likeId || message.likeId === undefined)) {
//               let newLike = new LikeResponse();
//               newLike.id = message.likeId;
//               form1.likes.push(newLike);
//             }
//             if (this.studentId == message.studentId) {
//               form1.isLike = message.isLike;
//             }
//           }

//           break;
//         case DiscussionFormEnum.removeLike:
//           let form2 = this.discussionFormList.find(obj => obj.id == message.discussionFormId) as DiscussionFormResponse;
//           let likeIndex = form2.likes.findIndex(like => like.id == message.likeId);

//           if (likeIndex !== -1) {
//             form2.likes.splice(likeIndex, 1);
//             console.log('Like removed');
//           }
//           if (this.loginService.getStudentId() == message.studentId) {
//             form2.isLike = false;
//           }
//           break;
//         case DiscussionFormEnum.createDiscussionForm:
//           if (message.studentId != this.studentId) {
//             if (!this.discussionFormList.find(e => e.id === message.id)) {
//               this.discussionFormList.unshift(message);
//             }
//           }
//           break;
//         case DiscussionFormEnum.typing.toString():
//           this.pushTypingMessage(message);
//           break;
//         default:
//           console.error('Unknown message type:', message.type, 'dd', DiscussionFormEnum.createDiscussionForm.toString());
//           break;
//       }

//     });
//   }

//   public sendMessage(data: any) {
//     this.webSocketService.sendMessage(data);
//   }

//   public sendTypingUser(status: any) {
//     let obj = {
//       type: 'typing',
//       status: status,
//       name: this.student.fullName,
//       id: this.student.studentId
//     }
//     this.sendMessage(obj);
//   }

//   private timeOut: number = 5000; // 5 seconds

//   public pushTypingMessage(
//     message: any): void {
//     if (message.status === 'typed') {
//       let obj = this.typing.find(e => e.id == message.id)
//       if (obj) {
//         this.removeTypingUser(message);
//         return;
//       }
//     } else {
//       let obj = this.typing.find(e => e.id === message.id) as Typing
//       if (!obj) {

//         let i = setTimeout(() => {
//           this.removeTypingUser(message);
//         }, this.timeOut);

//         if (this.student.studentId !== message.id)
//           this.typing.push(message); i.refresh;
//       }

//     }
//   }

//   public removeTypingUser(message: any) {
//     const index = this.typing.findIndex(obj => obj.id === message.id);
//     if (index !== -1) {
//       this.typing.splice(index, 1)[0] as Typing;
//     }
//   }

//   isImageExpanded = false;

//   toggleImageSize(event: Event) {
//     const image = event.target as HTMLImageElement;
//     this.isImageExpanded = !this.isImageExpanded;

//     if (this.isImageExpanded) {
//       image.classList.add('expanded');
//     } else {
//       image.classList.remove('expanded');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { StudentDetails } from 'src/app/entity/student-details';
import { CommentResponse } from 'src/app/payload/comment-response';
import { DiscussionFormResponse } from 'src/app/payload/discussion-form-response';
import { DiscussionFormServiceService } from 'src/app/service/discussion-form-service.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { LikeResponse } from 'src/app/payload/like-response';
import { DiscussionResponseForm } from 'src/app/payload/discussion-response-form';
import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';
import { CommentResponseForm } from 'src/app/payload/comment-response-form';
import { LikeResponseForm } from 'src/app/payload/like-response-form';
import { Typing } from 'src/app/entity/typing';
import { ToastService } from 'src/app/service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { text } from 'stream/consumers';
import { AppUtils } from 'src/app/utils/app-utils';


@Component({
  selector: 'app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.scss'],
})
export class DiscussionForumComponent implements OnInit {
  discussionFormList: DiscussionFormResponse[] = [];
  student: StudentDetails = new StudentDetails();
  comment: string = '';
  commentResponse: CommentResponse = new CommentResponse();
  likeResponse = new LikeResponse();
  discussionFormResponse: DiscussionFormResponse = new DiscussionFormResponse();
  discussionForm = new DiscussionFormResponse();
  commnetVisibility: boolean[] = [];
  message!: string;
  typing: Typing[] = [];
  isMessageSend: Boolean = false;
  isMessagLoading: boolean = false;
  inputForm!: FormGroup;
  imagePriview: string = ''

  constructor(
    private discussionFormSerice: DiscussionFormServiceService,
    private loginService: LoginService,
    private utilityService: UtilityServiceService,
    private studentService: StudentService,
    private webSocketService: WebsocketServiceDiscussionFormService,
    private toast: ToastService,
    private formBuilder: FormBuilder,

  ) {
    this.inputForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllForms();
    this.getStudent();
    this.connect();
  }

  public getAllForms() {
    this.isMessagLoading = true;
    this.discussionFormSerice
      .getAllDiscussionForm(this.loginService.getStudentId())
      .subscribe({
        next: (data: any) => {
          this.discussionFormList = data.response;
          this.isMessagLoading = false;
        },
        error: (er) => {
          alert('something went wrong...');
        },
      });
  }

  public like(discussionFormId: number) {
    this.discussionFormSerice
      .addOrRemoveLike(this.loginService.getStudentId(), discussionFormId)
      .subscribe({
        next: (data: any) => {
          let form = this.discussionFormList.find(
            (obj) => obj.id === discussionFormId
          ) as DiscussionFormResponse;
          //  form.likes = data.likes
          this.sendMessage(
            new LikeResponseForm(
              discussionFormId,
              'likeResponse',
              data.likes,
              data.isLike,
              this.loginService.getStudentId()
            )
          );
        },
        error: (er) => {
          alert('something went wrong...');
        },
      });
  }

  public getStudent() {
    this.studentService
      .getByStudentById(this.loginService.getStudentId())
      .subscribe({
        next: (data: any) => {
          this.student = data;
        },
      });
  }
  public date(date: any) {
    return this.utilityService.updateTimeline(date);
  }

  public createComment(id: number) {
    if (this.comment === '' || this.comment === ' ') return;
    this.discussionFormSerice
      .creatCommnet(this.loginService.getStudentId(), id, this.comment)
      .subscribe({
        next: (data: any) => {
          //let form = this.discussionFormList.find(obj => obj.id === id) as DiscussionFormResponse
          //this.commentResponse = data
          //  form.comments.push(this.commentResponse)
          this.comment = '';
          this.sendTypingUser('typed');
          this.sendMessage(
            new CommentResponseForm(
              id,
              data.studentProfilePic,
              data.studentName,
              data.content,
              data.createdDate.toString(),
              data.id,
              'commentResponse'
            )
          );
        },
        error: (er) => {
          this.toast.showSuccess('Already commented...', '');
        },
      });
  }

  isTrue: boolean = false;
  public createDiscussionForm() {
    if (this.inputForm.invalid) {
      AppUtils.submissionFormFun(this.inputForm)
      return;
    } else {
      this.isMessageSend = true;
      this.discussionFormSerice
        .createDiscussionForm(
          this.student.studentId,
          this.discussionForm.content,
          this.discussionForm.file,
          this.discussionForm.audioFile
        )
        .subscribe({
          next: (data: any) => {
            this.discussionFormList.unshift(data);
            let obj = new DiscussionResponseForm(
              data.studentProfilePic,
              data.studentName,
              data.content,
              data.createdDate.toString(),
              data.id,
              'createDiscussionForm',
              data.file,
              this.student.studentId,
              data.audioFile
            );
            this.discussionForm = new DiscussionFormResponse();
            this.sendMessage(obj);
            this.isMessageSend = false
            this.inputForm.reset();
            this.imagePriview = ''
          },
          error: (er) => {
            alert('something went wrong...');
          },
        });
    }
  }



  public fileEvent(event: any) {
    let file: any = event.target.files[0];

    if (file) {
      
      let imageUrl = URL.createObjectURL(file)
      if (file.type.startsWith('audio') || file.type.startsWith('video')) {
        this.discussionForm.audioFile = file;
        event.target.value = '';
        this.imagePriview = imageUrl
      } else if (file.type.startsWith('image')) {
        this.discussionForm.file = file;
        event.target.value = '';
        this.imagePriview = imageUrl
      }
    }
  }

  deleleImage() {
    this.imagePriview = ''
    this.discussionForm.audioFile = ''
    this.discussionForm.file = ''
  }

  toggleComment(index: number): void {
    this.commnetVisibility = [false];
    this.commnetVisibility[index] = !this.commnetVisibility[index];
  }
  connect() {
    this.webSocketService.getMessages().subscribe((message) => {
      switch (message.type) {
        case 'commentResponse':
          let form = this.discussionFormList.find(
            (obj) => obj.id === message.discussionFormId
          ) as DiscussionFormResponse;
          if (form && !form.comments.find((c) => c.id === message.id)) {
            form.comments.unshift(message);
          }
          break;
        case 'removeComment':
          let forum = this.discussionFormList.find(
            (obj) => obj.id === message.discussionFormId
          ) as DiscussionFormResponse;
          if (forum) {
            let index = forum.comments.findIndex(
              (obj1) => obj1.id === message.commentId
            );
            if (index !== -1) {
              forum.comments.splice(index, 1);
            }
          }
          break;
        case 'likeResponse':
          let form1 = this.discussionFormList.find(
            (obj) => obj.id == message.discussionFormId
          ) as DiscussionFormResponse;

          if (
            form1 &&
            message.likeId &&
            !form1.likes.find(
              (o) => o.id === message.likeId || message.likeId === undefined
            )
          ) {
            let newLike = new LikeResponse();
            newLike.id = message.likeId;
            form1.likes.push(newLike);
          }

          if (this.loginService.getStudentId() == message.studentId) {
            form1.isLike = message.isLike;
          }
          break;

        case 'removeLike':
          let form2 = this.discussionFormList.find(
            (obj) => obj.id == message.discussionFormId
          ) as DiscussionFormResponse;
          let likeIndex = form2.likes.findIndex(
            (like) => like.id == message.likeId
          );
          console.log(likeIndex);

          if (likeIndex !== -1) {
            form2.likes.splice(likeIndex, 1);
            console.log('Like removed');
          }
          if (this.loginService.getStudentId() == message.studentId) {
            form2.isLike = false;
          }
          break;

        case 'createDiscussionForm':
          this.isMessageSend = false;
          if (!this.discussionFormList.find((e) => e.id === message.id)) {
            this.discussionFormList.unshift(message);
          }
          break;
        case 'typing':
          this.pushTypingMessage(message);
          break;
        default:
          console.error('Unknown message type:', message.type);
          break;
      }
    });
  }

  public sendMessage(data: any) {
    this.webSocketService.sendMessage(data);
  }

  public sendTypingUser(status: any) {
    let obj = {
      type: 'typing',
      status: status,
      name: this.student.fullName,
      id: this.student.studentId,
    };
    this.sendMessage(obj);
  }

  private timeOut: number = 5000; // 5 seconds

  public pushTypingMessage(message: any): void {
    if (message.status === 'typed') {
      let obj = this.typing.find((e) => e.id == message.id);
      if (obj) {
        this.removeTypingUser(message);
        return;
      }
    } else {
      let obj = this.typing.find((e) => e.id === message.id) as Typing;
      if (!obj) {
        if (this.student.studentId !== message.id) this.typing.push(message);
        setTimeout(() => {
          this.removeTypingUser(message);
        }, this.timeOut);
      }
    }
  }

  public removeTypingUser(message: any) {
    const index = this.typing.findIndex((obj) => obj.id === message.id);
    if (index !== -1) {
      this.typing.splice(index, 1)[0] as Typing;
    }
  }

  isImageExpanded = false;

  toggleImageSize(event: Event) {
    const image = event.target as HTMLImageElement;
    this.isImageExpanded = !this.isImageExpanded;

    if (this.isImageExpanded) {
      image.classList.add('expanded');
    } else {
      image.classList.remove('expanded');
    }
  }
}
