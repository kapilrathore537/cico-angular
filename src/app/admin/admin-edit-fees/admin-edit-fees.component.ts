import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'igniteui-angular';
import { Fees } from 'src/app/entity/fees';
import { FeesPay } from 'src/app/entity/fees-pay';
import { FeesService } from 'src/app/service/fees.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-fees',
  templateUrl: './admin-edit-fees.component.html',
  styleUrls: ['./admin-edit-fees.component.scss']
})
export class AdminEditFeesComponent implements OnInit {
  feesId: number = 0;
  fees: Fees = new Fees();
  updateFeesForm: FormGroup
  constructor(private feesService: FeesService, private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private zone: NgZone) {
    this.updateFeesForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      courseName: ['', Validators.required],
      finalFees: ['', Validators.required],
      feesPaid: ['', Validators.required],
      remainingFees: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.feesId = this.activateRoute.snapshot.params[('feesId')];
    this.getFeesById();
  }

  isFieldInvalidForUpdateFeesDetailsForm(fieldName: string): boolean {
    const field = this.updateFeesForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public updateFeesDetailsFormSubmition() {
    Object.keys(this.updateFeesForm.controls).forEach(key => {
      const control = this.updateFeesForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


  public updateFees() {
    this.updateFeesForm.markAllAsTouched();
    if (this.updateFeesForm.valid) Swal.fire({
      title: 'Do you want to save the changes?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feesService.updateFeesDetalis(this.fees).subscribe({
          next: (res: any) => {
            // Update the fees model within Angular's zone
            this.zone.run(() => {
              this.fees = res;
            });
            Swal.fire('Saved!', '', 'success');
            this.router.navigate(['/admin/pendingfees']);
          },
          error: (error) => {
            console.error(error);
            Swal.fire('Error occurred while saving changes', '', 'error');
          }
        });
      } else if (result.isDenied) {
        this.getFeesById();
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     this.fees.remainingFees = this.fees.finalFees - this.fees.feesPaid;
    //     this.feesService.updateFeesDetalis(this.fees).subscribe({
    //       next:(res:any)=>{

    //        this.fees=res
    //       }
    //       })
    //     Swal.fire('Saved!', '', 'success')
    //     this.router.navigate(['/admin/pendingfees'])
    //   } else if (result.isDenied) {
    //     this.getFeesById()
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })
  }


  public getFeesById() {
    this.feesService.findByFeesId(this.feesId).subscribe(
      (data: any) => {
        this.fees = data
        // this.fees.remainingFees = this.fees.finalFees - this.fees.feesPaid
      }
    )
  }

  public updateRemainingFees() {
    this.fees.remainingFees = this.fees.finalFees - this.fees.feesPaid
  }

}
