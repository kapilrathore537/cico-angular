import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { Course } from 'src/app/entity/course';
import { StudentDetails } from 'src/app/entity/student-details';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { CourseRequest } from 'src/app/payload/course-request';
import { Coursereponse } from 'src/app/payload/coursereponse';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminstudent',
  templateUrl: './adminstudent.component.html',
  styleUrls: ['./adminstudent.component.scss']
})
export class AdminstudentComponent implements OnInit {

  students: StudentDetails[] = [];
  totalStudent: number = 0;
  search: string = '';
  id: number | null = null;
  courseId: number = 0;
  studentId: number = 0;
  newStudent: StudentDetails = new StudentDetails();
  courses: Course[] = [];
  courseResponse: Coursereponse[] = [];
  courseRequest: CourseRequest = new CourseRequest();
  course: Course = new Course();
  techImages: TechnologyStack[] = [];
  imageName = '';
  studentCourse: Coursereponse = new Coursereponse();
  selectedCourse: number = 0;

  constructor(private stuentService: StudentService, private courseService: CourseServiceService, private techService: TechnologyStackService, private activateRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.courseId = this.activateRoute.snapshot.params[('courseId')];
    this.searchStudentByName(0, 15);
    // this.getAllStudent(0,15)
    this.getAllCourse();
    this.getAllTechImages();

  }

  public getAllStudent(page: number, size: number, searchName?: string) {
    this.stuentService.getAllStudent(page, size).subscribe(
      (data: any) => {
        this.students = data.response
        this.totalStudent = data.totalElements
      }
    )
  }
  // public onChangePage(event: any) {
  //   this.getAllStudent(event.pageIndex, event.pageSize);
  // }

  public onChangePage(event: any) {
    this.searchStudentByName(event.pageIndex, event.pageSize);
  }
  public searchStudentByName(pageNumber: number, pageSize: number) {
    if (this.search == '') {
      this.getStudentData(pageNumber, pageSize);
    } else {
      this.getStudentData(pageNumber, pageSize);
    }
  }

  getStudentData(pageNumber: number, pageSize: number) {
    this.stuentService.searchStudentByName(pageNumber, pageSize, this.search).subscribe(
      (data: any) => {
        this.students = []
        this.students = data.response
        this.totalStudent = data.totalElements
      }
    )
  }

  public getAllCourse() {
    this.courseService.getAllNonStarterCourses().subscribe(
      (
        (data: any) => {
          this.courseResponse = data.NonStarterCourse
        }
      )
    )
  }
  public getAllTechImages() {
    this.techService.getAllTechnologyStack().subscribe({
      next: (data: any) => {
        this.techImages = data
      }
    });
  }

  public upgradeCourseOfStudent() {
    this.courseService.upgradeStudentCourse(this.newStudent.studentId, this.selectedCourse!=0 ?this.selectedCourse: this.newStudent.courseResponse.courseId).subscribe(
      (data: any) => {
        //  let student = this.students.findIndex(obj=>obj.studentId === this.newStudent.studentId) 
        //this.students = this.students.map(item => (item.studentId === data.studentId ? data : item));
        //  this.students[student] = this.newStudent
        const Toast = Swal.mixin({

          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Updated  success !!'
        }).then(e => {
          let student = this.students.find(obj => obj.studentId == this.newStudent.studentId) as StudentDetails
          student.applyForCourse = data.course.courseName;
          this.newStudent = new StudentDetails
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
      }
    )
  }
  //   Swal.fire({
  //     title: 'Do you want to save the changes?',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Save',
  //     denyButtonText: `Don't save`,
  //   }).then((result) => {

  //     if (result.isConfirmed) {

  //       this.courseService.upgradeStudentCourse(this.newStudent.studentId,this.selectedCourse).subscribe({
  //         next:(res:any)=>{

  //           this.newStudent=res
  //         }
  //         })
  //       Swal.fire('Saved!', '', 'success')
  //       this.newStudent=new StudentDetails
  //       this.getAllStudent(0,15)
  //     } else if (result.isDenied) {

  //       Swal.fire('Changes are not saved', '', 'info')
  //     }
  //   })
  // }
  public check(id: number) {
    if (this.studentCourse.courseId == id)
      return true
    return false;
  }

  selectCourse(courseId: number): void {
    this.selectedCourse = courseId;
  }
  public setCourse(course: any) {
    this.studentCourse = course
  }
}
