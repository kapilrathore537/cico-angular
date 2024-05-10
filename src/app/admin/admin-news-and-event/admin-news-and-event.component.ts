import { UtilityServiceService } from './../../service/utility-service.service';
import { Component, OnInit } from '@angular/core';
import { NewsAndEvent } from 'src/app/entity/news-and-event';
import { NewsEventServiceService } from 'src/app/service/news-event-service.service';

@Component({
  selector: 'app-admin-news-and-event',
  templateUrl: './admin-news-and-event.component.html',
  styleUrls: ['./admin-news-and-event.component.scss']
})
export class AdminNewsAndEventComponent implements OnInit {

  newsAndEvents:NewsAndEvent[]=[];
  newsAndEventss:NewsAndEvent=new NewsAndEvent();
  page=0;
  size=10;
  totalNewsAndEvents=0;
  id=0;
  constructor (private newsEventService:NewsEventServiceService)  {}

  ngOnInit(): void {
    this.getAllNewsAndEvents(this.page,this.size);
  }

  public getAllNewsAndEvents(page:number,size:number){
    this.newsEventService.getAllNewsAndEvents(page,size).subscribe({
      next:(data:any)=>{
        this.newsAndEvents = data.response;
        this.totalNewsAndEvents = data.totalElements;
        this.newsAndEvents = this.getNewsAndEvent(data);
      }
    })
  }

  public activeAndInActive(id:number){
    this.newsEventService.updateActiveAndInActive(id).subscribe({
      next:(data:any)=>{

      }
    })
  }

  public deleteNewsAndEvents(id:number){
    this.newsEventService.deleteNewsAndEvents(id).subscribe({
      next:(data)=>{
        this.getAllNewsAndEvents(this.page,this.size);

      }
    })
  }

  public searchNewsAndEvents(search:any){
    if(search==''){
      this.getAllNewsAndEvents(this.page,this.size);
    }else{
      this.newsEventService.searchNewsAndEvents(search,'admin',0,10).subscribe({
        next:(data:any)=>{
          this.newsAndEvents = data.content;
          this.totalNewsAndEvents = 0;
        }
      })
    }
  }

  public pageChange(event:any){
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllNewsAndEvents(this.page,this.size);
  }

  public getNewsAndEvent(data: any): NewsAndEvent[] {
    const news: NewsAndEvent[] = [];

    for (const element of data.response) {
      const count = this.getDaysDifference(element.createdDate);
      element.dayAgo = count; // Assuming the NewsAndEvent interface has a property called 'daysDifference'
      news.push(element);
    }

    return news;
  }
  public getDaysDifference(createdDate: any): number {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - new Date(createdDate).getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return Math.floor(differenceInDays); // Round down to the nearest integer
  }
}
