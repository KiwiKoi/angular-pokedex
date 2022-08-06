import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../models/pokemon';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://pokeapi.co/api/v2/'


  getPokemonByID(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}pokemon/${id}`)
  }
  getAllPokemon(offset: number = 0, limit: number = 20): Observable<Pokemon[]>{
    return this.http.get(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`)
    .pipe(
      map((x: any) => x.results)
  );
  }
}
