import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
export const WS_ENDPOINT = 'ws://localhost:8082';

export interface Data {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Includes a test server in node-server.js
  // Start the server by typing the following into the terminal
  // node node-server.js

  private socket$: WebSocketSubject<Data>;
  
  // Subscribe to the messages subject in other components
  messages$: Observable<Data>;

  constructor() {
    this.connect();
    this.messages$.subscribe(
      msg => console.log('message received from server: ' + msg.message), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  connect() {
    console.log('Connecting to websocket server');
  
    // Create a new websocket connection
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      // Do some error catching with the values before making them available
      // to other components
      this.messages$ = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
    }    
  }

  // Send a message to the websocket server
  sendMessage(message: string) {
    this.socket$.next({'message': message});
  }

  // Close the websocket connection
  close() {
    this.socket$.complete(); 
  }

  private getNewWebSocket(): WebSocketSubject<Data> {
    return webSocket(WS_ENDPOINT);
  }
}