import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TechnologyStack } from '../entity/technology-stack';
import { UtilityServiceService } from './utility-service.service';

@Injectable({
  providedIn: 'root'
})

export class TechnologyStackService {
  BASE_URL=this.utilityService.getBaseUrl();
  techUrl=this.BASE_URL+'/technologyStack';

  constructor(private http: HttpClient,private utilityService:UtilityServiceService) { }
  
   public getAllTechnologyStack(){
    return this.http.get<TechnologyStack[]>(`${this.techUrl }/getAllTechnologyStackApi`);
   }
}
