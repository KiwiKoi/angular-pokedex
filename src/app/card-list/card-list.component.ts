import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {PokeDataService} from '../services/poke-data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  currentPokemon!: Pokemon;
  pokemonList!: Pokemon[];

  constructor(private pokeDataService: PokeDataService){}

  ngOnInit(): void {
  this.fetchAllPokemon();
  console.log(this.pokemonList);
  }

  fetchAllPokemon(){
    this.pokeDataService.getAllPokemon().subscribe((response: any) => {
       this.pokemonList = response;
    }
    )
  }

}
