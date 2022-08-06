import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokeDataService } from '../services/poke-data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  pokemon!: Pokemon;
  pokemonList!: Pokemon[];

  constructor(private pokeDataService: PokeDataService) {}

  ngOnInit(): void {
    this.fetchAllPokemon();
  }

  fetchAllPokemon() {
    this.pokeDataService.getPokemonList().subscribe((response: Pokemon[]) => {
      this.pokemonList = response;
    });
  }
}
