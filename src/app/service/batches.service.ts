import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {
 
  BASE_URL=this.utilityService.getBaseUrl();
  batchUrl=this.BASE_URL+'/batch';

  constructor(private http: HttpClient,private utilityService:UtilityServiceService) { }

  public createNewBatch(batch:any){
    return this.http.post(`${this.batchUrl}/createBatch`,batch);
  }

  public getUpcomingBatch(){
    return this.http.get(`${this.batchUrl}/getUpcomingBatches`);
  }

  getBatchById(id: number) {
    return this.http.get(`${this.batchUrl}/getBatchById/${id}`);
  }
  
  public updateBatch(batch:any) {
   return this.http.put(`${this.batchUrl}/updateBatch`,batch);
  }

  public deletBatch(id: number) {
    return this.http.put(`${this.batchUrl}/deleteBatch/${id}`,{});
  }

  public getFirstUpcomingBatchByCourse(course:string){
    return this.http.get(`${this.batchUrl}/firstUpcomingBatchOfCurrentCourse/`+course);
  }
}