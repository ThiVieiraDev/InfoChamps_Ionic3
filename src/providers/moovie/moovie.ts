import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + '/movie/popular?page=' + page + '&api_key=ef6985e51fb58461301f937e3bf5ca8a');
  }

  getMovieDetails(filmeid) {
    return this.http.get(this.baseApiPath + '/movie/' + filmeid + '?api_key=ef6985e51fb58461301f937e3bf5ca8a');
  }
}
