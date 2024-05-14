import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class ChatmessageService {
 
    // public invitation_Request = new BehaviorSubject<any>(null);
    
  
    // constructor( private httpClient: HttpClient) { }
    // private invitationSubject: Subject<any> = new Subject<any>();
  
    // private socket: any;
    // private url: string = 'ws://localhost:8085';
  
    // connect(): void {
    //   const email = "rohan.dollop@gmail.com";
    //   this.socket = io(this.url, {
    //     path: '/socket.io',
    //     transports: ['websocket'],
  
    //     query: {
    //       room: email,
    //     }
    //   });
  
    //   this.socket.on('connect', (data: any) => {
    //     console.log('Connected from WebSocket server');
  
    //   });

    //   this.socket.on('get_message', (data: any) => {
    //     console.log('Socket Data :: '+data);
  
    //   });
  

  
    //   this.socket.on('disconnect', () => {
    //     console.log('Disconnected from WebSocket server');
    //   });
    // }
  
    // sendMessage(message: any, typeEvent: any) {
    //   this.socket.emit(typeEvent, message);
    // }
  
    // disConnect(): void {
    //   if (this.socket) {
    //     this.socket.disconnect();
    //     console.log('Disconnected from WebSocket server');
    //   }
    // }
  
  
    // getMessages() {
    //   let observable = new Observable<any>(observer => {
    //     this.socket.on('send_Invitation', (data: any) => {
    //       observer.next(data);
    //       console.log(data);
  
    //     });
    //     return () => { this.socket.disconnect(); };
    //   });
    //   return observable;
    // }
  
    // // Method to expose the observable for 'send_Invitation' event
    // getInvitation(): Observable<any> {
    //   return this.invitationSubject.asObservable();
    // }
  
  
  
    // getMessageHistoryByConversationId(conversationId: string, forWhichChats: string) {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //   const params = {
    //     conversationId: conversationId,
    //     forWhichChats: forWhichChats,
    //   }; // Include your parameter here
  
    //   return this.httpClient.get<any>(ApiRoutes.GET_MESSAGE_HISTORY, { headers, params });
  
    // }
  
  
    // sendMessageToServerToMaintainHistory(messageRequest: MessageRequest, sendOrSaveMessageFor: string) {
    //   const headers = new HttpHeaders({
    //     'enctype': 'multipart/form-data'
    //   });
    //   const params = { sendOrSaveMessageFor: sendOrSaveMessageFor }; // Include your parameter here
    //   const formData = new FormData();
  
    //   if (messageRequest.files != null) {
    //     for (const file of messageRequest.files) {
  
    //       formData.append("filesData", file);
    //     }
    //   }
  
    //   else {
    //     formData.append("filesData", 'null');
    //   }
  
    //   formData.append("message", new Blob([JSON.stringify(messageRequest)], { type: 'application/json' }));
  
  
    //   return this.httpClient.post(ApiRoutes.SEND_MESSAGE, formData, { headers, params });
    // }
  
  
    // public deleteMessges(messageDeleteRequestId: number) {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     
    //   const params = { deleteMessage: messageDeleteRequestId }; // Include your parameter here
  
    //   return this.httpClient.delete<any>(ApiRoutes.DELETE_MESSAGE, { headers, params });
  
    // }
  
  
    // public updateMessageIsSeenStatus(conversationIdData: string) {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //   const params = {
    //     conversationId: conversationIdData,
       
    //   }; // Include your parameter here
  
    //   return this.httpClient.get<any>(ApiRoutes.UPDATE_MESSAGE_MARK_AS_SEEN, { headers, params });
  
     
    // }
  
  
    
  }
  