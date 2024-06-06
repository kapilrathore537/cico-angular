import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/entity/course';
import { Fees } from 'src/app/entity/fees';
import { StudentDetails } from 'src/app/entity/student-details';
import { Coursereponse } from 'src/app/payload/coursereponse';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { FeesService } from 'src/app/service/fees.service';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-fees',
  templateUrl: './admin-add-fees.component.html',
  styleUrls: ['./admin-add-fees.component.scss']
})
export class AdminAddFeesComponent implements OnInit {

  student: StudentDetails[] = []
  course: Coursereponse[] = []
  // autofillForm: FormGroup;
  fees: Fees = new Fees();
  addFeesForm: FormGroup;
  isSubmitFee:boolean=false

  constructor(private studentService: StudentService, private fb: FormBuilder, private feesService: FeesService, private router: Router, private courseService: CourseServiceService, private formBuilder: FormBuilder) {
    this.addFeesForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      rollNo: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      course: ['', Validators.required],
      courseFees: ['', Validators.required],
      finalFees: ['', Validators.required],
      date: ['', Validators.required]
    });
  }



  ngOnInit(): void {

    this.studentService.allStudent().subscribe({
      next: (data: any) => {
        this.student = data
      }
    })
    this.courseService.getAllCourses(0, 100).subscribe({
      next: (data: any) => {
        this.course = data.response
      }
    })
  }
  isFieldInvalidForAddFeesDetailsForm(fieldName: string): boolean {
    const field = this.addFeesForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // public feesDetailsFormSubmition() {
  //   Object.keys(this.addFeesForm.controls).forEach(key => {
  //     const control = this.addFeesForm.get(key);
  //     if (control) {
  //       control.markAsTouched();
  //     }
  //   });
  //   const firstInvalidControl = document.querySelector('input.ng-invalid');
  //   if (firstInvalidControl) {
  //     firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // }

  onStudentChange(event: any) {
    const selectedStudentId = event.target.value;

    if (selectedStudentId !== "") {
      this.studentService.getByStudentById(selectedStudentId).subscribe(
        (data: any) => {
          console.log(data);
          this.fees.studentId = data.studentId;
          this.fees.email = data.email;
          this.fees.mobile = data.mobile;
          this.fees.fullName = data.fullName;
          this.fees.courseName = data.courseResponse.courseName;
          this.fees.courseId = data.courseResponse.courseId;
          this.fees.courseFees = data.courseResponse.courseFees;
        }
      );
    } else {
      // Clear the form fields when "Select Name" is chosen
      this.fees.studentId = 0;
      this.fees.email = '';
      this.fees.mobile = '';
      this.fees.fullName = '';
      this.fees.courseName = '';
      this.fees.courseFees = '';


    }
  }

  onCourseChange(event: any) {

    const selectedCourseId = event.target.value;
    if (selectedCourseId !== "") {
      this.courseService.getCourseByCourseId(selectedCourseId).subscribe(
        (data: any) => {
          this.fees.courseId = data.courseId;
          this.fees.courseFees = data.courseFees;
        }
      );
    } else {
      this.fees.courseId = 0;
      this.fees.courseFees = '';
    }
  }

  addFees() {
    this.addFeesForm.markAllAsTouched();
    if (this.addFeesForm.valid){
      this.isSubmitFee=true
      this.feesService.addStudentFees(this.fees).subscribe(
        (data: any) => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'Fees Add success !!'
          }).then(e => {
            this.fees = new Fees
            this.router.navigate(['/admin/fees']);
          })
          this.isSubmitFee=false
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
            title: 'Registration failed !!'
          })
          this.isSubmitFee=false
        }
      )
    }
  }

}




