import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leaves } from '../entity/leaves';
import { UtilityServiceService } from './utility-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  BASE_URL=this.utilityService.getBaseUrl();
  leaveUrl=this.BASE_URL+'/leave';

  constructor(private http: HttpClient,private utilityService:UtilityServiceService) { }


  public getLeaveType(){
    return this.http.get(`${this.leaveUrl}/getLeavesType`);
  }

  public addLeave(leave:Leaves) {
    return this.http.post(`${this.leaveUrl}/addStudentLeave?leaveTypeId=${leave.leaveType.leaveTypeId}&leaveStartDate=${leave.leaveDate}&leaveEndDate=${leave.leaveEndDate}&leaveReason=${leave.leaveReason}&leaveDayType=${leave.leaveDayType}&halfDayType=${leave.halfDayType}`,{response:'text'});
  }

  public getStudentLeaves(id:any){
    return this.http.get(`${this.leaveUrl}/getStudentLeavesById?studentId=${id}&limit=0&offset=30`);
  }

  public getLeavesFiterData(id:number,monthNo:number){
    return this.http.get(`${this.leaveUrl}/studentLeaveMonthFilterById?studentId=${id}&monthNo=${monthNo}`)
  }

}
