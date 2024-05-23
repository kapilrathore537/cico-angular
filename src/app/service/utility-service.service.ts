import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

 // private BASE_URL = 'http://cicoapi.dollopinfotech.com';

  private BASE_URL =   'http://localhost:8080';//
  private readonly TIME_URL = 'http://worldtimeapi.org/api/ip';


  getCurrentTime(): Observable<any> {
    return this.http.get(this.TIME_URL).pipe(
      catchError(error => {
        console.error('Error fetching time:', error);
        return throwError(error);
      })
    );
  }

  getCurrentDate(): Observable<any> {
    return this.getCurrentTime().pipe(
      map((data: any) => this.transformData(data)),
      catchError(error => {
        console.error('Error transforming data:', error);
        return throwError(error);
      })
    );
  }

  private transformData(data: any): any {
    let date = new Date(data.datetime);
    let date2 = this.datePipe.transform(date, 'yyyy-MM-dd');
    let dateWithTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    let time = date.toLocaleTimeString();

    return {
      date: date2,
      dateWithTime: dateWithTime,
      time: time,
      actualDate:date
    };
  }

  public getBaseUrl() {
    return this.BASE_URL;
  }

  public getTimeUrl() {
    return this.TIME_URL;
  }

  public updateTimeline(date: any) {
    // Calculate the time difference and update the timestamp
    const now = new Date(); 
    
    const messageDate = new Date(date); // Replace with the actual message date
    const timeDiff = now.getTime() - messageDate.getTime();

    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    const day = Math.floor(hours / 24)

    if (hours > 0 && hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (day > 0) {
      return `${day} ${day === 1 ? 'day' : 'days'} ago`
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  }

  // decodeFromBase64(encodedString: string): ArrayBuffer {
  //   return decode(encodedString);
  // }

  // encodeToBase64(data: ArrayBuffer): string {
  //   return encode(data);
  // }
}


