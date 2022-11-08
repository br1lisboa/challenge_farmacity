import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.moviesService.getMovie(id)
      .subscribe(m => this.movie = m);
  }

  goBack(): void {
    this.location.back();
  }
}
