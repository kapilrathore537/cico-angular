import { Injectable } from '@angular/core';
import { WebsocketServiceDiscussionFormService } from './websocket-service-discussion-form-service.service';
import { UtilityServiceService } from './utility-service.service';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  BASE_URL = this.utilityService.getBaseUrl;
  readonly QR_URL = `ws://192.168.0.127:8080/ws/sessionId?=`
  readonly DISCUSSION_URL = `ws://localhost:8080/ws/discussion`

  // public messages!: Subject<any>; // DISCUSSIONFORUM
  // public messages1!: Subject<any>;// FOR QR
   constructor(private websocketService: WebsocketServiceDiscussionFormService, private utilityService: UtilityServiceService) { }
  // public connectForDiscussionForm() {
  //   this.messages = <Subject<any>>(
  //     this.websocketService.connectForDiscussionForm(this.DISCUSSION_URL).pipe(map((response: MessageEvent): any => {
  //       let content = JSON.parse(response.data);
  //       return content;
  //     }))
  //   );
  // }

  // public connectForQr(key: any) {
  //   this.messages1 = <Subject<any>>(
  //     this.websocketService.connectForQr(this.QR_URL + key).pipe(map((response: MessageEvent): any => {
  //       let content = JSON.parse(response.data);
  //       return content;
  //     }))
  //   );
  // }

  // public disconnect() {
  //   this.websocketService.disconnect(this.QR_URL);
  //   this.websocketService.disconnect(this.DISCUSSION_URL);
  // }
}
