import { Component, OnInit, Input } from '@angular/core';
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
  pokemonDetail!: Pokemon[];
  @Input() searchTerm!: string;

  constructor(private pokeDataService: PokeDataService) {}


  ngOnInit(): void {
    this.fetchAllPokemon();
  }

  fetchAllPokemon() {
    this.pokeDataService.getPokemonList().subscribe((response: Pokemon[]) => {
    this.pokemonList = response;
    });
  }

  searchBar() {

    if(this.searchTerm.length > 0){
      this.pokeDataService
      .getPokemonDetail(this.searchTerm)
      .subscribe((response: Pokemon[]) => {
        this.pokemonList = response;
        console.log(this.pokemonList)
      });
    } else {
      this.fetchAllPokemon();
    }

  }
}
