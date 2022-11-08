import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { __metadata } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesUrl = 'https://flixster.p.rapidapi.com';

  httpOptions = {
    headers: new HttpHeaders({ 
      'X-RapidAPI-Host': 'flixster.p.rapidapi.com', 
      'X-RapidAPI-Key': '551e97f875mshf9627862c4ffc08p11b5e5jsnc89c3088d14b'
    }),
    params: null
  };

  constructor(
    private http: HttpClient) { }

    /** GET movies from the server */
     searchMovies(query: string): Observable<Movie[]> {
      let params = new HttpParams().set('query', query);
      this.httpOptions.params = params;

      return this.http.get<any>(`${this.moviesUrl}/search`, this.httpOptions)
      .pipe(
        map(response => response.data.search.movies.map(i => new Movie({id: i.emsId, name: i.name, img: i.posterImage && i.posterImage.url}))),
        catchError(this.handleError<any>('searchMovies', []))
      )
    }

    /** GET movie by id. */
    getMovie(id: string): Observable<Movie> {
      let params = new HttpParams().set('emsVersionId', id);
      this.httpOptions.params = params;
      return this.http.get<any>(`${this.moviesUrl}/movies/detail`, this.httpOptions)
      .pipe(
        map(response => { console.log(response);
            return new Movie({id: id, name: response.data.movie.name, img: response.data.movie.posterImage && response.data.movie.posterImage.url, 
          trailer: response.data.movie.trailer && response.data.movie.trailer.url, duration: Math.round(Number(response.data.movie.durationMinutes) / 60 * 100) / 100,
          synopsis: response.data.movie.synopsis, release: response.data.movie.releaseDate, directedBy: response.data.movie.directedBy})
        }),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
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
