import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../models/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://pokeapi.co/api/v2/'


  getPokemonByID(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.baseUrl}pokemon/${id}`)
  }
}
