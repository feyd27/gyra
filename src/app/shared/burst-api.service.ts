import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blocks } from '../shared/blocks';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BurstApiService {

  // API link
  apiURL = 'https://wallet.burst-alliance.org:8125/burst?requestType=getMiningInfo';

  constructor(private http: HttpClient) { }
    /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HttpClient API get() method => Get Mining Info
  public getBlocks(): Observable<Blocks> {
    return this.http.get<Blocks>(this.apiURL)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  // Error handling
  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log('console.log' + errorMessage);
     // window.alert(errorMessage);
     return throwError(errorMessage);
  }
}

