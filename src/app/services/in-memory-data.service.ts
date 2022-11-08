import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event, MovieSelected } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies: MovieSelected[] = [
      { movieId: "3e127fa3-fe69-3891-9196-5b467245d67f", description: "A Quiet Place Part II", votedBy: [1,2,5], img: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/680nMV20IeBTp29zFSbJKcq6JDU=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzUwNjllNzg3LWJhMGMtNGVmMi1iNjlhLTcxZWJlNjY3ZDI3ZS5qcGc=" },
      { movieId: "869f1527-3933-3789-a5ad-ddb5bf86d275", description: "Downton Abbey: A New Era", votedBy: [1,2,5,6], img: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/LPanafFv2r8f9LCMMPYY625IZrY=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2NhOGRiZjcxLTMwMDEtNDJlMC04YWJiLTJhZDVjZWEyODg4ZC5qcGc=" },
      { movieId: "916d7581-c986-32f2-b17e-65670ad349db", description: "Glass Onion: A Knives Out Mystery", votedBy: [1,2,5,8], img: "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/Mtg-vEUajN8oamKcLLI7hZT-Rhs=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2FhYTcxNzNkLTExYzItNDk1NC1iNDNmLWViMDRlYjg5NzliNC5qcGc=" },
    ];    

    const events: Event[] = [
      { id: 1, name: 'Hot Sale', date: '4/11/2022 19:00', creator: true, movies: movies },
      { id: 2, name: 'Halloween', date: '29/10/2022 21:00', creator: false, movies: movies },
      { id: 3, name: 'Bombasto', date: '11/11/2022 21:00', creator: false, movies: movies },
    ];
    return {events};
  }

  // Overrides the genId method to ensure that an event always has an id.
  genId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
  }
}