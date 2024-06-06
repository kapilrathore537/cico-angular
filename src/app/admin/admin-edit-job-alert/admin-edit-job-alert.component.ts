import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobAlert } from 'src/app/entity/job-alert';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { JobAlertRequest } from 'src/app/payload/job-alert-request';
import { JobAlertService } from 'src/app/service/job-alert.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-job-alert',
  templateUrl: './admin-edit-job-alert.component.html',
  styleUrls: ['./admin-edit-job-alert.component.scss']
})
export class AdminEditJobAlertComponent implements OnInit{
  jobAlert:JobAlert=new JobAlert();
  jobAlertRequest:JobAlertRequest=new JobAlertRequest();
  jobAlerts:JobAlert[]=[];
  technologyStack:TechnologyStack[]=[];
  imageName = ''
  jobId:number=0
  isSubmit:boolean=false;
  constructor(private jobAlertService: JobAlertService, private technologyStackService: TechnologyStackService, private router: Router,private utilityService:UtilityServiceService,private activateRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.jobId= this.activateRoute.snapshot.params[('jobId')];
    this.getAllTechImages();
    this.getJobAlert()
    
  }

  public getAllTechImages(){
    this.technologyStackService.getAllTechnologyStack().subscribe({
      next:(data:any)=>{
        this.technologyStack = data
      }
    });
  }
   getJobAlert(){

    this.jobAlertService.getJob(this.jobId).subscribe(
      (data:any)=>{
        // this.jobAlertRequest=data
        this.jobAlert=data
      }
    )
   }
   public updateJob(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isSubmit=true
        this.jobAlertService.updateJobs(this.jobAlert).subscribe({
          next:(res:any)=>{
            
          //  this.jobAlertRequest=res
           this.jobAlert=res
          }
          })
        Swal.fire('Saved!', '', 'success')
        this.router.navigate(['/admin/jobalert'])
      } else if (result.isDenied) {
        this.getJobAlert()
        Swal.fire('Changes are not saved', '', 'info')
        this.isSubmit=false
      }
    })
  }
  }