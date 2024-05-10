import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fees } from 'src/app/entity/fees';
import { StudentDetails } from 'src/app/entity/student-details';
import { FeesService } from 'src/app/service/fees.service';
import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-admin-fees',
  templateUrl: './admin-fees.component.html',
  styleUrls: ['./admin-fees.component.scss']
})
export class AdminFeesComponent implements OnInit {

  feeses: Fees[] = []
  feesList: number = 0;
  feesId: number = 0
  selectedFeesId: number | null = null;
  student: StudentDetails = new StudentDetails();
  newFees: Fees = new Fees();
  search: string = ''
  startDate: string = ''
  endDate: string = ''
  constructor(private studentService: StudentService, private activateRoute: ActivatedRoute, private feesService: FeesService) { }
  ngOnInit(): void {
    this.getAllStudentFeesList(0, 8);
    this.feesId = this.activateRoute.snapshot.params[('feesId')];
  }

  getAllStudentFeesList(page: Number, size: number) {
    this.feesService.getAllFees(page, size).subscribe(
      (data: any) => {
        this.feeses = data.response;
        this.feesList = data.totalElements;
      }
    )
  }

  public onChangePage(event: any) {
    this.getAllStudentFeesList(event.pageIndex, event.pageSize);
  }


  public findByfeesId(feesId: number) {
    this.feesService.findByFeesId(feesId).subscribe(
      (data: any) => {
        this.selectedFeesId = data.feesId
      }
    )
  }

  public searchByName() {

    if (this.search == '')
      this.getAllStudentFeesList(0, 8);
    else {
      this.feesService.searchByName(this.search, 'Pending').subscribe(
        (data: any) => {
          this.feeses = data;
          this.feesList = data.totalElements;
        }
      )
    }
  }
  public findByGivenDate() {
    if (this.startDate == '' && this.endDate == '') {
      this.getAllStudentFeesList(0, 8);
    } else {
      this.feesService.findByDate(this.startDate, this.endDate, 'Pending').subscribe(
        (data: any) => {
          this.feeses = data;
          this.feesList - data.totalElements
        }
      )
    }
  }
}
