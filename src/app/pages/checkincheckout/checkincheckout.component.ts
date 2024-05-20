import { LocationStrategy, DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { an } from '@fullcalendar/core/internal-common';
import { log } from 'console';
import * as moment from 'moment';
import { Observable, interval, map, switchMap } from 'rxjs';
import { Assignment } from 'src/app/entity/assignment';
import { Attendance } from 'src/app/entity/attendance';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-checkincheckout',
  templateUrl: './checkincheckout.component.html',
  styleUrls: ['./checkincheckout.component.scss']
})
export class CheckincheckoutComponent {
  color = "--mdc-circular-progress-active-indicator-color: #fffff;"

  timer: number = 0;
  interval: any;
  totalHrs: any;
  totalHrs2: any;


  attendance: Attendance = new Attendance;

  checkInTime = this.attendance.checkInTime
  checkOutTime = this.attendance.checkOutTime
  name: string = ''
  clock: Observable<Date> | undefined;
  dateString: Date | undefined;
  formattedDate: string | null | undefined;
  formattedCheckInTime: any
  formattedCheckOutTime: any
  message: string = '';


  check: boolean = false;
  assignment: Assignment = new Assignment()
  datePipe: any;
  constructor(private service: AssignmentServiceService,
    private utilityService: UtilityServiceService,
    private loginService: LoginService,
    private localst: LocationStrategy, private studentService: StudentService
    , private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.preventBackButton();

    //Timer API
    this.clock = interval(1000).pipe(
      switchMap(() => this.studentService.getCurrentTime()),
      map((response: any) => new Date(response.datetime))
    );

    //Timer API ---> get formattedDate
    const datePipe = new DatePipe('en-US');
    this.clock.subscribe((date: Date) => {
      this.formattedDate = datePipe.transform(date, 'EEEE, MMM d');
    });

    //Student Attendance API
    this.getStudentAttendance();
    setTimeout(() => {
      //  this.startTimer2();
    }, 2000);
  }

  public getStudentAttendance() {
    this.studentService.getTodayAttendance(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {

        this.message = data.message;
        if (data.message == 'SUCCESS') {
          this.attendance = data.Attendance;
          this.checkInTime = this.attendance.checkInTime
          this.checkOutTime = this.attendance.checkOutTime
          if (this.attendance.checkInTime != null) {
            this.formattedCheckInTime = this.changeTimeFormat(this.attendance.checkInTime);
          }
          if (this.attendance.checkOutTime != null) {
            this.formattedCheckOutTime = this.changeTimeFormat(this.attendance.checkOutTime);
          }
          const checkInTime: moment.Moment = moment(this.attendance.checkInTime, 'HH:mm:ss');
          if (this.attendance.checkOutTime != null) {
            const checkOutTime: moment.Moment = moment(this.attendance.checkOutTime, 'HH:mm:ss');
            const duration: moment.Duration = moment.duration(checkOutTime.diff(checkInTime));
            this.timer = duration.asSeconds();
            this.totalHrs = new Date(this.timer * 1000).toISOString().substr(11, 8);
            this.runSpinner();
            this.isSpinner = true;
          } else {
            const currentTime: moment.Moment = moment(new Date(), 'HH:mm:ss');
            const duration: moment.Duration = moment.duration(currentTime.diff(checkInTime));
            this.timer = duration.asSeconds();
            this.startTimer();
          }
        }
      },
    });
  }
  isSpinner: boolean = false;
  totalTime: number = 9 * 60 * 60;  // 9  hour
  percent: number = 0;

  public startTimer() {
    {
      this.isSpinner = true
      this.interval = setInterval(() => {
        this.timer++;
        this.totalHrs = new Date(this.timer * 1000).toISOString().substr(11, 8);
        this.runSpinner();
      }, 1000);
    }
  }

  runSpinner() {
    this.percent = (this.timer / this.totalTime) * 100
    if (Math.floor(this.percent) <= 50) {
      this.color = 'danger'
    } else if (this.percent > 50 && this.percent < 100) {
      this.color = 'warning'
    } else {
      this.color = 'primary'
    }
  }

  public isCheckedIn() {
    if (this.attendance.checkOutTime == undefined || this.attendance.checkInTime != undefined)
      return true;
    return false;
  }

  public preventBackButton() {
    history.pushState(null, '', location.href);
    this.localst.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }


  public changeTimeFormat(time: any) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }


}
