import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsUrl = 'api/events';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

    /** GET evebnts from the server */
    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        catchError(this.handleError<Event[]>('getEvents', []))
      )
    }

    /** GET event by id. Will 404 if id not found */
    getEvent(id: number): Observable<Event> {
      const url = `${this.eventsUrl}/${id}`;
      return this.http.get<Event>(url)
      .pipe(
        catchError(this.handleError<Event>(`getEvent id=${id}`))
      );
    }

    /** PUT: update the event on the server */
    updateEvent(event: Event): Observable<any> {
      return this.http.put(this.eventsUrl, event, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateEvent'))
      );
    }

    /** POST: add a new event to the server */
    addEvent(event: Event): Observable<Event> {
      return this.http.post<Event>(this.eventsUrl, event, this.httpOptions).pipe(        
        catchError(this.handleError<Event>('addEvent'))
      );
    }

    /** DELETE: delete the event from the server */
    deleteEvent(id: number): Observable<Event> {
      const url = `${this.eventsUrl}/${id}`;

      return this.http.delete<Event>(url, this.httpOptions).pipe(        
        catchError(this.handleError<Event>('deleteEvent'))
      );
    }
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
