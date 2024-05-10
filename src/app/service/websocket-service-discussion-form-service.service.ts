
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject, share } from 'rxjs';
import { UtilityServiceService } from './utility-service.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceDiscussionFormService {
  private stompClient: any;
  private messagesSubject: Subject<any> = new Subject<any>();
  private messagesObservable: Observable<any>;
  SOCKET_URL = this.utilityService.getBaseUrl() + "/socket"

  constructor(private utilityService: UtilityServiceService) {
    this.connect();
    this.messagesObservable = this.messagesSubject.asObservable().pipe(share());
  }

  // public connect(): void {
  //   const socket = new SockJS(this.SOCKET_URL);
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, (frame: any) => {
  //     this.stompClient.subscribe('/queue/Chatmessages', (message: any) => {
  //       const parsedMessage = JSON.parse(message.body);
  //     //  console.log = () => { };
  //       this.messagesSubject.next(parsedMessage);
  //     });
  //   });
  //   let countConnectCalls: number = 0
  //   // Reconnect logic
  //   socket.onclose = (event: CloseEvent) => {
  //     if (countConnectCalls <= 15 && navigator.onLine) {
  //       setTimeout(() => {
  //       //  this.connect();
  //         countConnectCalls += 1
  //       }, 2000);
  //     } else {
  //       countConnectCalls = 0;
  //     }
  //   };
  // }

  public connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      // If the client is already connected, return to prevent redundant connections
      return;
    }
  
    const socket = new SockJS(this.SOCKET_URL);
    this.stompClient = Stomp.over(socket);
  
    let subscribed = false; // Flag to track if subscription has been done
  
    const onConnect = (frame: any) => {
      if (!subscribed) {
        subscribed = true; // Set the flag to true after subscribing once
        this.stompClient.subscribe('/queue/Chatmessages', (message: any) => {
          const parsedMessage = JSON.parse(message.body);
          this.messagesSubject.next(parsedMessage);
        });
      }
    };
  
    this.stompClient.connect({}, onConnect);
  
    // let countConnectCalls = 0;
  
    // // Reconnect logic
    // socket.onclose = (event: CloseEvent) => {
    //   if (countConnectCalls <= 15 && navigator.onLine) {
    //     setTimeout(() => {
    //       this.connect();
    //       countConnectCalls += 1;
    //     }, 2000);
    //   } else {
    //     countConnectCalls = 0;
    //   }
    // };
  }
  
  public getMessages(): Observable<any> {
   // console.log = () => { };
    return this.messagesObservable;
  }
  public sendMessage(message: any): void {
    //console.log = () => { };
    this.stompClient.send('/api/socket', {}, JSON.stringify(message));
  }

}