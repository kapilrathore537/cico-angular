import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { CourseRequest } from '../payload/course-request';
import { Course } from '../entity/course';
@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {


  BASE_URL = this.utilityService.getBaseUrl();
  courseUrl = this.BASE_URL + '/course';

  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  public getAllCourses(page: number, size: number) {
    return this.http.get(`${this.courseUrl}/findAllCourseApi?page=${page}&size=${size}`);
  }
  public getAllNonStarterCourses() {
    return this.http.get(`${this.courseUrl}/getAllNonStarterCourses`);
  }

  public saveCourse(course: CourseRequest) {
    return this.http.post(`${this.courseUrl}/addCourseApi`, course);
  }

  public getCourseByCourseId(courseId: number) {
    return this.http.get(`${this.courseUrl}/findCourseByIdApi?courseId=${courseId}`)
  }


  public deleteCourse(id: number) {
    return this.http.put(`${this.courseUrl}/deleteCourseByIdApi?courseId=${id}`, {});
  }

  public updatCourse(course: any) {
    return this.http.put(`${this.courseUrl}/updateCourseApi`, course);
  }

  public getAllCourse(isStarter: boolean) {
    return this.http.get(`${this.courseUrl}/getAllCourseApi?isStarter=${isStarter}`);
  }


  public upgradeStudentCourse(studentId: number, courseId: number) {
    return this.http.put(`${this.courseUrl}/studentUpgradeCourse?studentId=${studentId}&courseId=${courseId}`, null);
  }

  public getCourseProgress(studentId: number) {
    return this.http.get(`${this.courseUrl}/getCourseProgress?studentId=${studentId}`);
  }

  public getAllCourseForStudent(studentId: any) {
    return this.http.get(`${this.courseUrl}/getAllCourseForStudent?studentId=${studentId}`);
  }

}
