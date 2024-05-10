import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { Profile } from '../entity/profile';
import { get } from 'http';
import { FeesPay } from '../entity/fees-pay';

@Injectable({
  providedIn: 'root'
})
export class FeesPayService {

  BASE_URL = this.utilityService.getBaseUrl();
  feesUrl = this.BASE_URL + '/fees';
  TIME_URL = this.utilityService.getTimeUrl();
  profileData: Profile = new Profile();
  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  public feesPay(feesPay:FeesPay){
    let params = new FormData()
 console.log(feesPay);
 
    params.append("feesId", feesPay.feesPay.feesId.toString())
    params.append("feesPayAmount", feesPay.feesPayAmount.toString())
    params.append("payDate", feesPay.payDate.toString())
    params.append("recieptNo", feesPay.recieptNo.toString());
    params.append("description", feesPay.description.toString());

    return this.http.post(`${this.feesUrl}/feesPay`, params)
  }

  public feesPendingList(page: Number, size: number){
    return this.http.get<FeesPay[]>(`${this.feesUrl}/feesPendingList?page=${page}&size=${size}`);
  }

  public getAllTransection(studentId: number) {
    return this.http.get(`${this.feesUrl}/getAllTransectionsByStudentId?studentId=${studentId}`);
  }

  public feesPayList(page: Number, size: number){
    return this.http.get<FeesPay[]>(`${this.feesUrl}/feesPayList?page=${page}&size=${size}`);
  }

  public findByPayId(payId:number){
    return this.http.get(`${this.feesUrl}/findByPayId?payId=${payId}`);
  }

  public updateFeesPay(feesPay:FeesPay){
    return this.http.put(`${this.feesUrl}/updateFeesPay`, feesPay);
  }
  public searchByNameInFeesPayList(fullName :string){
    return this.http.get(`${this.feesUrl}/searchByNameInFeesPayList?fullName=${fullName}`)
  }

  public searchByMonthInFeesPayList(startDate:string,endDate:string){
    return this.http.get(`${this.feesUrl}/searchByMonthInFeesPayList?startDate=${startDate}&endDate=${endDate}`);
  }
}
