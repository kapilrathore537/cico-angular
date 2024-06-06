import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ChartComponent } from 'ng-apexcharts';
import { Attendance } from 'src/app/entity/attendance';
import { LeaveType } from 'src/app/entity/leave-type';
import { Leaves } from 'src/app/entity/leaves';
import { LeaveService } from 'src/app/service/leave.service';
import { StudentService } from 'src/app/service/student.service';
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
export class AttendanceComponent implements OnInit, AfterViewInit {
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
  isSubmited: boolean = false

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
    this.attendanceMonth = 'Month';
    this.leaveMonth = 'Month';
    this.getAttendanceHistoy();
    this.getStudentLeaves();
    this.getStudentPresentsAbsentsAndLeavesYearWise();
    this.cloneTicks();

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
      this.isSubmited = true
    
      this.leaveService.addLeave(this.leaves).subscribe({
        next: (res: any) => {
          if (res.message == 'SUCCESS') {
            this.getStudentLeaves();
            document.getElementById('leave-modal-close1')?.click()
            this.toastService.showSuccess('Successfully leave applied', 'Success')
            this.isSubmited = false
            
          }
        },
        error: (err: any) => {
          this.color = 'red';
          this.message = err.error.message;
          this.isSubmited = false
    
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
    const checkInTime = this.extractHourAndMinutes(attendance.checkInTime);
    const checkOutInTime = this.extractHourAndMinutes(attendance.checkOutTime);

    setTimeout(() => {
      this.highlightInterval(checkInTime.hour, checkInTime.minutes, checkOutInTime.hour, checkOutInTime.minutes);
    }, 100);
  }

  extractHourAndMinutes(time: string): { hour: number, minutes: number } {
    // Split the time string by spaces and colons
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert to 24-hour format if necessary
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return { hour: hours, minutes: minutes };
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


  getAllLeaves() {
    this.getStudentLeaves();
  }
  getALLAttandance() {
    this.getAttendanceHistoy()
  }


  ///////////////////////////////////////////////////////////////////////////////


  ngAfterViewInit(): void {

  }

  highlightSector(startAngle: number, endAngle: number): void {
    startAngle = startAngle % 360;
    endAngle = endAngle % 360;

    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;

    const startX = Math.cos(startAngleRad) * 100;
    const startY = Math.sin(startAngleRad) * 100;
    const endX = Math.cos(endAngleRad) * 100;
    const endY = Math.sin(endAngleRad) * 100;

    let largeArcFlag = (endAngle - startAngle + 360) % 360 > 180 ? 1 : 0;

    if (endAngle < startAngle) {
      largeArcFlag = 1;
    }

    const pathData = [
      'M', 0, 0,
      'L', startX, startY,
      'A', 100, 100, 0, largeArcFlag, 1, endX, endY,
      'Z'
    ].join(' ');

    const highlightedSector = document.getElementById('highlightedSector');
    highlightedSector!.setAttribute('d', pathData);

    const startPoint = document.getElementById('startPoint');
    startPoint!.setAttribute('cx', startX.toString());
    startPoint!.setAttribute('cy', startY.toString());

    const endPoint = document.getElementById('endPoint');
    endPoint!.setAttribute('cx', endX.toString());
    endPoint!.setAttribute('cy', endY.toString());
  }

  highlightInterval(startHour: number, startMin: number, endHour: number, endMin: number): void {
    const startDeg = ((startHour + startMin / 60) / 12) * 360;
    const endDeg = ((endHour + endMin / 60) / 12) * 360;
    this.highlightSector(startDeg, endDeg);
  }

  cloneTicks(): void {
    for (let i = 1; i <= 12; i++) {
      const el = document.querySelector('.fiveminutes') as HTMLElement;
      const clone = el.cloneNode(true) as HTMLElement;
      clone.setAttribute('class', `fiveminutes f${i}`);
      document.getElementById('clockface')?.appendChild(clone);
      const el2 = document.querySelector(`.f${i}`) as HTMLElement;
      el2.style.transform = `rotate(${30 * i}deg)`;
    }

    for (let i = 1; i <= 60; i++) {
      const el = document.querySelector('.minutes') as HTMLElement;
      const clone = el.cloneNode(true) as HTMLElement;
      clone.setAttribute('class', `minutes m${i}`);
      document.getElementById('clockface')?.appendChild(clone);
      const el2 = document.querySelector(`.m${i}`) as HTMLElement;
      el2.style.transform = `rotate(${6 * i}deg)`;

    }
  }
}
