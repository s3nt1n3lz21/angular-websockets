import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-websockets';
  liveData$: Observable<any>;

  constructor(private dataService: DataService) {
    // Connect to the websocket if not already
    // this.dataService.connect();

    // Subscribe to the live websocket data
    // this.liveData$ = this.dataService.messages$.pipe(
    //   // map(rows => rows.data),
    //   tap(x => console.log(x)),
    //   catchError(error => { throw error }),
    //   tap({
    //     error: error => console.log('[Live component] Error:', error),
    //     complete: () => console.log('[Live component] Connection Closed')
    //   }
    //   )
    // );
  }

  sendMessage(message) {
    this.dataService.sendMessage(message);
  }
}
