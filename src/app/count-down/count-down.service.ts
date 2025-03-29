import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  private apiUrl = 'https://67e7a5b620e3af747c3f239c.mockapi.io/api/seconds/secondsLeft';

  constructor(private http: HttpClient) {}

  getSecondsLeft(): Observable<number> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl).pipe(
      map(response => {
        console.log('response: ',response[0]);
        return response[0];
      })
    );
  }
}
