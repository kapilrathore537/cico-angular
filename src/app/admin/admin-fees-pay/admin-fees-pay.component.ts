import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Fees } from 'src/app/entity/fees';
import { FeesPay } from 'src/app/entity/fees-pay';
import { FeesPayService } from 'src/app/service/fees-pay.service';
import { FeesService } from 'src/app/service/fees.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-fees-pay',
  templateUrl: './admin-fees-pay.component.html',
  styleUrls: ['./admin-fees-pay.component.scss']
})
export class AdminFeesPayComponent implements OnInit {

  feesPays: FeesPay = new FeesPay();
  feeses: Fees[] = [];
  feesPayes: FeesPay[] = [];
  fees: Fees = new Fees();
  totalNumberOfFeesPay: number = 0
  feesId: number = 0;
  payId: number = 0;
  feesList = 0;
  fullName = '';
  endDate = '';
  startDate = '';
  updatePaidFeesFrom: FormGroup
  isSubmit:boolean=false;


  constructor(private feesPayService: FeesPayService, private router: Router, private formBuilder: FormBuilder) {
    this.updatePaidFeesFrom = this.formBuilder.group({
      feesPayAmount: ['', Validators.required],
      payDate: ['', Validators.required],
      recieptNo: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAllfeesPayList(0, 8);

  }

  public getAllfeesPayList(page: Number, size: number) {
    this.feesPayService.feesPayList(page, size).subscribe(
      (data: any) => {
        this.feesPayes = data.response;
        this.feesList = data.totalElements
      }
    )
  }
  public onChangePage(event: any) {
    this.getAllfeesPayList(event.pageIndex, event.pageSize);
  }

  public getFeesPayByPayId(payId: number) {
    // this.payId = this.route.snapshot.params[('payId')];
    this.feesPayService.findByPayId(payId).subscribe({
      next: (data: any) => {
        this.feesPays = data
        this.payId = this.feesPays.payId
      }
    })
  }

  public searchByName() {

    if (this.fullName == '')
      this.getAllfeesPayList(0, 8);
    else {
      this.feesPayService.searchByNameInFeesPayList(this.fullName).subscribe(
        (data: any) => {
          // this.feeses=data;
          this.feesPayes = data
          this.feesList = data.totalElements;
        }
      )
    }
  }

  public findByGivenDate() {
    if (this.startDate == '' && this.endDate == '') {
      this.getAllfeesPayList(0, 8);
    } else {
      this.feesPayService.searchByMonthInFeesPayList(this.startDate, this.endDate).subscribe(
        (data: any) => {
          this.feesPayes = data;

          this.feesList - data.totalElements
        }
      )
    }
  }

  isFieldInvalidForPaidFeesForm(fieldName: string): boolean {
    const field = this.updatePaidFeesFrom.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public paidFeesDetailsFormSubmition() {
    AppUtils.submissionFormFun(this.updatePaidFeesFrom)
  }

  public updateFeesPay() {
    this.updatePaidFeesFrom.markAllAsTouched();
    if (this.updatePaidFeesFrom.valid){
      this.isSubmit=true
      this.feesPayService.updateFeesPay(this.feesPays).subscribe(
        (data: any) => {
          this.feesPays = data
          this.isSubmit=false
          const Toast = Swal.mixin({

            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'Update Fees Pay success !!'
          }).then(e => {
            this.feesPays = new FeesPay
            this.getAllfeesPayList(0, 8);
            document.getElementById('amount-details-modal')?.click()
            //   this.router.navigate(['/admin/payfees']);
          })
        },
        (err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'error',
            title: 'failed !!'
          })
          this.isSubmit=false

        }
      )
    }
  }


}
