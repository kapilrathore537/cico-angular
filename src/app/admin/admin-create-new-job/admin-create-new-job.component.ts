import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobAlert } from 'src/app/entity/job-alert';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { JobAlertRequest } from 'src/app/payload/job-alert-request';
import { JobAlertService } from 'src/app/service/job-alert.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-new-job',
  templateUrl: './admin-create-new-job.component.html',
  styleUrls: ['./admin-create-new-job.component.scss']
})
export class AdminCreateNewJobComponent implements OnInit{
  jobAlert:JobAlert=new JobAlert();
  jobAlertRequest:JobAlertRequest=new JobAlertRequest();
  jobAlerts:JobAlert[]=[];
  technologyStack:TechnologyStack[]=[];
  imageName = ''
  jobDetailsForm: FormGroup ;
  isSubmit:boolean=false;

  constructor(private jobAlertService: JobAlertService, private technologyStackService: TechnologyStackService, private router: Router, private formBuilder: FormBuilder) {
    this.jobDetailsForm = this.formBuilder.group({
      jobType: ['', Validators.required],
      companyName: ['', Validators.required],
      jobPackage: ['', Validators.required],
      technicalSkills: ['', Validators.required],
      experienceRequired: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],

    });
   }
  ngOnInit(): void {
    this.getAllTechImages();
  }
  isFieldInvalidForjobDetailsForm(fieldName: string): boolean {
    const field = this.jobDetailsForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public jobDetailsFormSubmition() {
    Object.keys(this.jobDetailsForm.controls).forEach(key => {
      const control = this.jobDetailsForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  createJob(){
    this.jobDetailsForm.markAllAsTouched();
    console.log(this.jobAlertRequest);
    
    if (this.jobDetailsForm.valid && this.imageName != ''){
      this.isSubmit=true

    this.jobAlertService.addJob(this.jobAlertRequest).subscribe(
      (data: any) => {
        if(this.jobAlertRequest.type=='JOB'){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'job Add success !!'
        }).then(e => {
          this.jobAlert = new JobAlert
          this.router.navigate(['/admin/jobalert']);
        })
        this.isSubmit=false

      }else{
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
          title: 'Internship Add success !!'
        }).then(e => {
          this.jobAlert = new JobAlert
          this.router.navigate(['/admin/jobalert']);
        })

      }
      },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'error',
          title: ' failed !!'
        })
      }
   
    )
    }
  }

  public getAllTechImages(){
    this.technologyStackService.getAllTechnologyStack().subscribe({
      next:(data:any)=>{
        this.technologyStack = data
      }
    });
  
  }
 
  set(){
    this.jobDetailsForm.setValue({
      //imageName:this.imageName // Set the value for the 'jobType' field
    
    });
  }
}
