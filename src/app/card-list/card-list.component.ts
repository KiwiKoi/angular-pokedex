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
  // searchResults!: Pokemon[];
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
    let searchResults: Pokemon[] = [];
    if(this.searchTerm.length > 0){
      this.fetchAllPokemon();
      for(let i = 0; i < this.pokemonList.length; i++){
        if(this.pokemonList[i].name.includes(this.searchTerm)){
          this.pokeDataService.getPokemonDetail(this.pokemonList[i].name)
          .subscribe((response: Pokemon) => {
            searchResults.push(response)
            this.pokemonList = searchResults;
          });
        } else {
        }
      }
    } else {
      this.fetchAllPokemon();
    }

  }
}
