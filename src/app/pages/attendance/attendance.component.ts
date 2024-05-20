import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { ChartComponent } from 'ng-apexcharts';
import { Attendance } from 'src/app/entity/attendance';
import { LeaveType } from 'src/app/entity/leave-type';
import { Leaves } from 'src/app/entity/leaves';
import { LeaveService } from 'src/app/service/leave.service';
import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { PresentAbsentLeaveBarChart } from 'src/app/charts/present-absent-leave-bar-chart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/utils/app-utils';
import { ToastService } from 'src/app/service/toast.service';
export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  xaxis: any;
  colors: any;
  yaxis: any;
};

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public attendanceOptions: Partial<ChartOptions>;


  monthCategories: string[] = [];
  selectedDate: any;
  attendances: Attendance[] = [];
  attendance: Attendance = new Attendance();
  leaveTypes: LeaveType[] = [];
  leaves: Leaves = new Leaves();
  leavesList: Leaves[] = [];
  leavesModal: Leaves = new Leaves();
  attendanceMonth = 'Month';
  leaveMonth = 'Month';
  totalAttendance: number = 0;
  message: string = '';
  color: string = '';
  presentsMap = new Map<number, number>();
  leavesMap = new Map<number, number>();
  absentMap = new Map<number, number>();
  mispunchMap = new Map<number, number>();
  earlyCheckOutMap = new Map<number, number>();
  attendanceChart: PresentAbsentLeaveBarChart =
    new PresentAbsentLeaveBarChart();

  minStart: any
  minEnd: any

  applyLeaveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private leaveService: LeaveService,
    private toastService: ToastService,
    private loginService: LoginService
  ) {

    let today = new Date
    today.setDate(today.getDate() + 1)
    this.minStart = today.toISOString().slice(0, 10);
    //  if(this.leaves.leaveDate ==null){
    //   today.setDate(today.getDate()+2)
    //   this.minEnd =  today.toISOString().slice(0, 10);
    //  }
    this.presentsMap = new Map();
    this.attendanceOptions = this.attendanceChart.attendanceOptions;

    this.applyLeaveForm = this.formBuilder.group({
      leaveTypeId: ['', Validators.required],
      leaveDayType: ['', Validators.required],
      halfDayType: ['', Validators.required],
      leaveDate: ['', Validators.required],
      leaveEndDate: ['', Validators.required],
      leaveReason: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    // this.cloneTicks();
    // this.intervalId = setInterval(() => this.setTime(), 1000);
    this.attendanceMonth = 'Month';
    this.leaveMonth = 'Month';
    this.getAttendanceHistoy();
    // this.getLeaveType();
    this.getStudentLeaves();
    this.getStudentPresentsAbsentsAndLeavesYearWise();
       this.loadClock();
  }


  public isFieldInvalidForApplyLeaveForm(fieldName: string): boolean {
    const field = this.applyLeaveForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public checkApplyLeaveForm() {
    Object.keys(this.applyLeaveForm.controls).forEach((key) => {
      const control = this.applyLeaveForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  public getAttendanceHistoy() {
    this.studentService.getAttendanceHistory().subscribe({
      next: (data: any) => {
        this.attendances = data?.response?.attendance;
        if (this.attendances) {
          this.totalAttendance = this.attendances.length;
          this.formattingTimeAndDate();
        }
      },
    });
  }

  public getLeaveType() {
    this.leaveService.getLeaveType().subscribe({
      next: (res: any) => {
        this.leaveTypes = res.leaveType;
      },
    });
  }

  public formattingTimeAndDate() {
    if (this.attendances.length !== 0) {
      for (let i = 0; i < this.attendances.length; i++) { // Change <= to < here
        this.attendances[i].checkInTime = moment(
          this.attendances[i].checkInTime,
          'HH:mm:ss'
        ).format('hh:mm:ss A');
        this.attendances[i].checkOutTime = moment(
          this.attendances[i].checkOutTime,
          'HH:mm:ss'
        ).format('hh:mm:ss A');
        this.attendances[i].checkInDate = moment(
          this.attendances[i].checkInDate
        ).format('DD MMM YYYY');
        this.attendances[i].workingHour = new Date(
          this.attendances[i].workingHour * 1000
        )
          .toISOString()
          .substr(11, 8);
      }
    }
  }

  public addFullDayField() {
    this.applyLeaveForm.addControl('leaveEndDate', this.formBuilder.control('', Validators.required));
    this.removeHalfDayField()
  }
  public RemoveFullDayField() {
    this.applyLeaveForm.removeControl('leaveEndDate');
  }
  public addHalfDayField() {
    this.applyLeaveForm.addControl('halfDayType', this.formBuilder.control('', Validators.required))
    this.RemoveFullDayField();
  }
  public removeHalfDayField() {
    this.applyLeaveForm.removeControl('halfDayType');
  }


  public addStudentLeave() {
    if (this.applyLeaveForm.invalid) {
      AppUtils.submissionFormFun(this.applyLeaveForm)
      return;
    } else {
      this.leaveService.addLeave(this.leaves).subscribe({
        next: (res: any) => {
          if (res.message == 'SUCCESS') {
            this.getStudentLeaves();
            document.getElementById('leave-modal-close1')?.click()
            this.toastService.showSuccess('Successfully leave applied', 'Success')
          }
        },
        error: (err: any) => {
          this.color = 'red';
          this.message = err.error.message;
        },
      });
    }

  }

  public getStudentLeaves() {
    this.leaveService
      .getStudentLeaves(this.loginService.getStudentId())
      .subscribe({
        next: (res: any) => {
          this.leavesList = res.leavesData.response;
        },
      });
  }

  public getLeavesFilter(monthNo: number) {
    this.leaveMonth = moment(monthNo, 'MM').format('MMMM');
    this.leaveService
      .getLeavesFiterData(this.loginService.getStudentId(), monthNo)
      .subscribe({
        next: (res: any) => {
          this.leavesList = res.leavesData.response;
        },
      });
  }

  public getAttendanceFilter(monthNo: number) {
    this.attendanceMonth = moment(monthNo, 'MM').format('MMMM');
    this.studentService.getAttendanceFilterData(monthNo).subscribe({
      next: (res: any) => {
        this.attendances = res.AttendanceData;
        this.formattingTimeAndDate();
      },
    });
  }

  public attendanceModal(attendance: Attendance) {
    this.attendance = attendance;
  }

  public leaveModal(leave: Leaves) {
    this.leavesModal = leave;
  }

  public clearData() {
    this.leaves = new Leaves();
    this.message = '';
    this.applyLeaveForm.reset()
  }

  public getStudentPresentsAbsentsAndLeavesYearWise() {
    this.attendanceOptions.series[0].data = [];
    this.studentService
      .getStudentPresentsAbsentsAndLeavesYearWise(
        new Date().getFullYear(),
        this.loginService.getStudentId()
      )
      .subscribe((data: any) => {
        this.presentsMap = data.presents;
        this.leavesMap = data.leaves;
        this.absentMap = data.absents;
        this.mispunchMap = data.mispunchs
        this.earlyCheckOutMap = data.earlyCheckOuts

        this.setPresentData();
        this.setAbsentData();
        this.setLeavesData();
        this.setEarlyCheckOutData();
        this.setMishPunchData();

        setTimeout(() => {
          this.attendanceOptions.xaxis = {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          }
          // window.dispatchEvent(new Event('resize'));
        }, 100);

      });
  }
  public setPresentData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.presentsMap).map(
      ([key, value]) => [parseInt(key), value]
    );
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }

    this.attendanceOptions.series[0].data = arr;
  }

  public setLeavesData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.leavesMap).map(
      ([key, value]) => [parseInt(key), value]
    );
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }
    this.attendanceOptions.series[2].data = arr;  /////

  }

  public setAbsentData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.absentMap).map(
      ([key, value]) => [parseInt(key), value]
    );
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }
    this.attendanceOptions.series[1].data = arr;
  }
  public setMishPunchData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.mispunchMap).map(
      ([key, value]) => [parseInt(key), value]
    );
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }
    this.attendanceOptions.series[3].data = arr;
  }
  public setEarlyCheckOutData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.earlyCheckOutMap).map(
      ([key, value]) => [parseInt(key), value]
    );
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }
    this.attendanceOptions.series[4].data = arr;
  }

  validFields(field: string) {
    let obj = this.applyLeaveForm.get(field);
    obj!.markAsTouched();
    obj!.updateValueAndValidity();
  }

  public setDate() {
    this.minEnd = this.leaves.leaveDate
  }


  //   private cloneTicks(): void {
  //     for (let i = 1; i <= 12; i++) {
  //       const el = document.querySelector(".fiveminutes") as HTMLElement;
  //       const clone = el.cloneNode(true) as HTMLElement;
  //       clone.setAttribute('class', `fiveminutes f${i}`);
  //       const app = document.getElementById("clockface") as HTMLElement;
  //       app.appendChild(clone);
  //       const el2 = document.querySelector(`.f${i}`) as HTMLElement;
  //       el2.style.transform = `rotate(${30 * i}deg)`;
  //     }

  //     for (let i = 1; i <= 60; i++) {
  //       const el = document.querySelector(".minutes") as HTMLElement;
  //       const clone = el.cloneNode(true) as HTMLElement;
  //       clone.setAttribute('class', `minutes m${i}`);
  //       const app = document.getElementById("clockface") as HTMLElement;
  //       app.appendChild(clone);
  //       const el2 = document.querySelector(`.m${i}`) as HTMLElement;
  //       el2.style.transform = `rotate(${6 * i}deg)`;
  //     }
  //   }


  //   private setTime(): void {
  //     const now = new Date();
  //     const sec = now.getSeconds();
  //     const min = now.getMinutes();
  //     const hour = now.getHours();

  //     const secdeg = (sec / 60) * 360;
  //     const mindeg = (min / 60) * 360;
  //     const hourdeg = ((hour + min / 60) / 12) * 360;

  //     this.rotateElement('.sec', secdeg);
  //     this.rotateElement('.min', mindeg);
  //     this.rotateElement('.hour', hourdeg);

  //   }

  //   private rotateElement(selector: string, deg: number): void {
  //     const element = document.querySelector(selector) as HTMLElement;
  //     element.style.transform = `rotate(${deg}deg)`;
  //   }
  //   synth = window.speechSynthesis;
  //   intervalId: any;
  //  hr: HTMLElement | null = document.querySelector("#hr");
  //  mn: HTMLElement | null = document.querySelector("#mn");
  //  sc: HTMLElement | null = document.querySelector("#sc");

  //  intervalId: NodeJS.Timer | null = setInterval(() => {
  //   let day: Date = new Date();
  //   let hh: number = day.getHours() * 30;
  //   let mm: number = day.getMinutes() * 6;
  //   let ss: number = day.getSeconds() * 6;

  //   if (this.hr && this.mn && this.sc) {
  //     this.hr!.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  //     this.mn!.style.transform = `rotateZ(${mm}deg)`;
  //     this.sc!.style.transform = `rotateZ(${ss}deg)`;
  //   }

  //   /* Digital Clock */

  //   let hours: HTMLElement | null = document.getElementById("hours");
  //   let minutes: HTMLElement | null = document.getElementById("minutes");
  //   let seconds: HTMLElement | null = document.getElementById("seconds");
  //   let ampm: HTMLElement | null = document.getElementById("ampm");

  //   let h: any = new Date().getHours();
  //   let m: any = new Date().getMinutes();
  //   let s: any = new Date().getSeconds();

  //   let am: string = h > 12 ? "PM" : "AM";

  //   if (h > 12) {
  //     h = h - 12;
  //   }

  //   h = h < 10 ? "0" + h : h;
  //   m = m < 10 ? "0" + m : m;
  //   s = s < 10 ? "0" + s : s;

  //   if (hours && minutes && seconds && ampm) {
  //     hours.innerHTML = h.toString();
  //     minutes.innerHTML = m.toString();
  //     seconds.innerHTML = s.toString();
  //     ampm.innerHTML = am;
  //   }
  // }, 1000); // 1000 milliseconds, equivalent to 1 second



  // loadClock() {
  //   let hr: any = document.querySelector("#hr");
  //   let mn: any = document.querySelector("#mn");
  //   let sc: any = document.querySelector("#sc");

  //   setInterval(() => {
  //     let day = new Date();
  //     let hh = day.getHours() * 30;
  //     let mm = day.getMinutes() * 6;
  //     let ss = day.getSeconds() * 6;

  //     hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  //     mn.style.transform = `rotateZ(${mm}deg)`;
  //     sc.style.transform = `rotateZ(${ss}deg)`;

  //     /* Digital Clock */

  //     let hours: any = document.getElementById("hours");
  //     let minutes: any = document.getElementById("minutes");
  //     let seconds: any = document.getElementById("seconds");
  //     let ampm: any = document.getElementById("ampm");

  //     let h: any = new Date().getHours();
  //     let m: any = new Date().getMinutes();
  //     let s: any = new Date().getSeconds();

  //     let am = h > 12 ? "PM" : "AM";

  //     if (h > 12) {
  //       h = h - 12;
  //     }

  //     h = h < 10 ? "0" + h : h;
  //     m = m < 10 ? "0" + m : m;
  //     s = s < 10 ? "0" + s : s;
  //     if (h)
  //       hours.innerHTML = h;
  //     if (m)
  //       minutes.innerHTML = m;
  //     if (s)
  //       seconds.innerHTML = s;
  //     if (am)
  //       ampm.innerHTML = am;
  //   });
  // }


  loadClock() {
    // Select the elements for hours, minutes, and seconds
    let hr: HTMLElement | null = document.querySelector("#hr");
    let mn: HTMLElement | null = document.querySelector("#mn");
    let sc: HTMLElement | null = document.querySelector("#sc");
  
    // Select the elements for the digital clock
    let hours: HTMLElement | null = document.getElementById("hours");
    let minutes: HTMLElement | null = document.getElementById("minutes");
    let seconds: HTMLElement | null = document.getElementById("seconds");
    let ampm: HTMLElement | null = document.getElementById("ampm");
  
    // Select the elements for check-in, checkout, and gap time display
    let checkinInput: HTMLInputElement | null = document.getElementById("checkin") as HTMLInputElement;
    let checkoutInput: HTMLInputElement | null = document.getElementById("checkout") as HTMLInputElement;
    let gapTimeDisplay: HTMLElement | null = document.getElementById("gapTime");
  
    // Update the clock every second
    setInterval(() => {
      let day: Date = new Date();
  
      // Calculate the rotations for the analog clock
      let hh: number = day.getHours() * 30; // 360 degrees / 12 hours = 30 degrees per hour
      let mm: number = day.getMinutes() * 6; // 360 degrees / 60 minutes = 6 degrees per minute
      let ss: number = day.getSeconds() * 6; // 360 degrees / 60 seconds = 6 degrees per second
  
      // Apply the rotations
      if (hr) hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      if (mn) mn.style.transform = `rotateZ(${mm}deg)`;
      if (sc) sc.style.transform = `rotateZ(${ss}deg)`;
  
      // Get the current time
      let h: any = day.getHours();
      let m: any = day.getMinutes();
      let s: any     = day.getSeconds();
  
      // Determine AM/PM
      let am: string = h >= 12 ? "PM" : "AM";
      if (h > 12) h -= 12;
  
      // Format the time as two digits
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
  
      // Update the digital clock display
      if (hours) hours.innerHTML = String(h);
      if (minutes) minutes.innerHTML = String(m);
      if (seconds) seconds.innerHTML = String(s);
      if (ampm) ampm.innerHTML = am;
  
      // Calculate and display the gap time if both check-in and checkout times are set
      if (checkinInput?.value && checkoutInput?.value) {
        let checkinTime: Date = new Date(`1970-01-01T${checkinInput.value}:00`);
        let checkoutTime: Date = new Date(`1970-01-01T${checkoutInput.value}:00`);
  
        if (checkoutTime < checkinTime) {
          // If checkout is before check-in, assume checkout is on the next day
          checkoutTime.setDate(checkoutTime.getDate() + 1);
        }
  
        let gapTimeMs: number = checkoutTime.getTime() - checkinTime.getTime();
        let gapHours: number = Math.floor(gapTimeMs / (1000 * 60 * 60));
        let gapMinutes: number = Math.floor((gapTimeMs % (1000 * 60 * 60)) / (1000 * 60));
        let gapSeconds: number = Math.floor((gapTimeMs % (1000 * 60)) / 1000);
  
        // Format the gap time as two digits
        let gapTimeStr: string = 
          (gapHours < 10 ? "0" + gapHours : gapHours) + ":" + 
          (gapMinutes < 10 ? "0" + gapMinutes : gapMinutes) + ":" + 
          (gapSeconds < 10 ? "0" + gapSeconds : gapSeconds);
  
        // Update the gap time display
        if (gapTimeDisplay) gapTimeDisplay.innerHTML = gapTimeStr;
      }
    }, 1000); // Update interval set to 1 second
  }
  

  getAllLeaves() {
    this.getStudentLeaves();
  }
  getALLAttandance() {
    this.getAttendanceHistoy()
  }
}
