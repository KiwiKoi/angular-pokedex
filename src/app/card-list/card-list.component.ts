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
  generations: any[] = [
    { name: 'generation 1', offset: 0, limit: 151 },
    { name: 'generation 2', offset: 151, limit: 100 },
    { name: 'generation 3', offset: 251, limit: 135 },
    { name: 'generation 4', offset: 386, limit: 107 },
    { name: 'generation 5', offset: 493, limit: 156 },
    { name: 'generation 6', offset: 649, limit: 72 },
    { name: 'generation 7', offset: 721, limit: 88 },
    { name: 'generation 8', offset: 809, limit: 96 }
  ];
  @Input() searchTerm!: string;

  form = new FormGroup({
    type: new FormControl(),
    generation: new FormControl(),
  });

  constructor(private pokeDataService: PokeDataService) {}

  ngOnInit(): void {
    this.fetchAllPokemon();
    this.fetchAllTypes();
  }

  filterPokemon() {
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

  setGeneration() {
    let offset: number = this.form.value.generation.offset;
    let limit: number = this.form.value.generation.limit;

    this.pokeDataService
      .getPokemonList(offset, limit)
      .subscribe((response: Pokemon[]) => {
        this.pokemonList = response;
        console.log(response);
      });
  }

  fetchAllPokemon(offset?: number, limit?: number) {
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
