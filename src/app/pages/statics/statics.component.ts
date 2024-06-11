import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
  ChartComponent,
} from 'ng-apexcharts';
import { AssignmentChart } from 'src/app/charts/assignment-chart';
import { NormalExamBar, ScheduleExamBar } from 'src/app/charts/normal-exam-bar';
import { ExamServiceService } from 'src/app/service/exam-service.service';
import { StudentService } from 'src/app/service/student.service';

export type AssignmentOption = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type NormalExamResult = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  colors: any
  legend: any;
  stroke: any;
};
export type ScheduleTestResult = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  colors: any
  legend: any;
  stroke: any;
};


@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss'],
})
export class StaticsComponent {
  @ViewChild('assignmentChart') assignmentChart!: ChartComponent;
  public assignmentOption: any;

  @ViewChild('normalTestChart') normalTestChart!: ChartComponent | undefined;
  public normalExamOption: Partial<NormalExamResult>;

  
  @ViewChild('scheduleTestChart') scheduleTestChart!: ChartComponent | undefined;
  public scheduleExamOption: Partial<ScheduleTestResult>;

  assignmentBar: AssignmentChart = new AssignmentChart();
  normalExamBar: NormalExamBar = new NormalExamBar();
  scheduleExamBar: ScheduleExamBar = new ScheduleExamBar();


  constructor(
    private examService: ExamServiceService,
    private studentService: StudentService
  ) {
    this.assignmentOption = this.assignmentBar.assignmentOption;
    this.normalExamOption = this.normalExamBar.normalTestResult;
    this.scheduleExamOption = this.scheduleExamBar.scheduleTestResult;
  }

  ngOnInit() {
    this.getExamResult();
  }

  public getExamResult() {
    this.studentService.student.subscribe((value) => {
      this.examService.fetchExamCounting(value.id).subscribe((result:any)=>{
      this.normalExamOption.series = [result.totalNormalCount,result.normalExamCount];
      this.scheduleExamOption.series = [result.totalScheduleExamCount,result.scheduleExamCount];
      });
    });
  }
}
