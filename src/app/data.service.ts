import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
export const WS_ENDPOINT = 'ws://localhost:8082';

export interface Data {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subject: WebSocketSubject<Data> = webSocket(WS_ENDPOINT);

  constructor() {
    this.subject.subscribe(
      msg => console.log('message received: ' + msg.id), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
}

  // private socket$: WebSocketSubject<any>;
  // private messagesSubject$ = new Subject();
  // The observable we subscribe to in components to get the messages
  // public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
  
  // public connect(): void {
    // console.log('connecting to websocket server');
  
    // // Create a new websocket connection
    // if (!this.socket$ || this.socket$.closed) {
    //   this.socket$ = this.getNewWebSocket();
    //   // Get the observable stream of messages
    //   const messages = this.socket$.pipe(
    //     tap({
    //       error: error => console.log(error),
    //     }), catchError(_ => EMPTY));
    //   // Add the stream of messages
    //   this.messagesSubject$.next(messages);
    // }
  // }
  
  // private getNewWebSocket() {
  //   return webSocket(WS_ENDPOINT);
  // }

  // // Send a message to the websocket server
  // sendMessage(msg: any) {
  //   this.socket$.next(msg);
  // }

  // close() {
  //   this.socket$.complete(); 
  // }
// }