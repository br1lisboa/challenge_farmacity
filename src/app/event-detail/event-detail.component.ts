import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventsService } from '../services/events.service';
import { Event, MovieSelected } from '../models/event';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event; 
  userId: number = 99;
  movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  get votes() {
    return this.event.movies.reduce((acc, curVal) => {
        return acc.concat(...curVal.votedBy)
    }, []);
  }

  get canVote() {
      return this.event && !this.event.creator && this.votes.findIndex(v => v == this.userId) < 0;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private eventsService: EventsService,
    private moviesService: MoviesService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getEvent();

    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.moviesService.searchMovies(term)),
    );
  }

  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id == 0) {
      this.event = { id: 0,
        name: '',
        creator: true,
        movies: [],
        date: '' } as Event;
    } else {
      this.eventsService.getEvent(id)
        .subscribe(e => this.event = e);
    }
  }

  vote(movieId: string){
      let i = this.event.movies.findIndex(m => m.movieId == movieId);
      this.event.movies[i].votedBy.push(this.userId);
      this.save();
  }
  
  addMovie2Event(movie: Movie){
    if (this.event.movies.findIndex(m => m.movieId == movie.id) < 0){
      let m = {movieId: movie.id, description: movie.name, img: movie.img, votedBy: []} as MovieSelected
      this.event.movies.push(m);
      this.save();
    }
  }

  removeMovie(movieId: string){
    let i = this.event.movies.findIndex(m => m.movieId == movieId);
    if(i > -1) {
      this.event.movies.splice(i, 1);
      this.save();
    }
  }

  save() {
    if(this.event.id == 0) {
      this.event.id = null;
      this.eventsService.addEvent(this.event)
        .subscribe(e => {
          this.event = e;
          this.location.replaceState(`/${e.id}`);
        });
    } else {
      this.eventsService.updateEvent(this.event)
        .subscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
