import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokeDataService } from '../services/poke-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  pokemon!: Pokemon;
  pokemonList!: Pokemon[];
  pokemonDetail!: Pokemon[];
  typeList!: any[];
  @Input() searchTerm!: string;

  form = new FormGroup({
    type: new FormControl(),
  });

  constructor(private pokeDataService: PokeDataService) {}
  ngOnInit(): void {
    this.fetchAllPokemon();
    this.fetchAllTypes();
  }

  async filterPokemon() {
    let filterResults: Pokemon[] = [];
    this.fetchAllPokemon();

    for (let i = 0; i < this.pokemonList.length; i++) {
      this.pokeDataService
        .getPokemonDetail(this.pokemonList[i].name)
        .subscribe((response: Pokemon) => {
          if (
            response.types.some(
              (type) => type.type.name === this.form.value.type.name
            )
          ) {
            filterResults.push(response);
            this.pokemonList = filterResults;
          }
        });
    }
  }

  fetchAllPokemon() {
    this.pokeDataService.getPokemonList().subscribe((response: Pokemon[]) => {
      this.pokemonList = response;
    });
  }

  fetchAllTypes() {
    this.pokeDataService.getPokemonTypes().subscribe((response: any) => {
      this.typeList = response;
    });
  }

  searchBar() {
    let searchResults: Pokemon[] = [];
    if (this.searchTerm.length > 0) {
      this.fetchAllPokemon();
      for (let i = 0; i < this.pokemonList.length; i++) {
        if (this.pokemonList[i].name.includes(this.searchTerm)) {
          this.pokeDataService
            .getPokemonDetail(this.pokemonList[i].name)
            .subscribe((response: Pokemon) => {
              searchResults.push(response);
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
