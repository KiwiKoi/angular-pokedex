import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {PokeDataService} from '../services/poke-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() pokemon!: any;

pokemonDetail!: Pokemon;

  constructor(private pokeDataService: PokeDataService){}

  ngOnInit(): void {
    this.fetchPokemon();
  }

fetchPokemon(){
  this.pokeDataService.getPokemonDetail(this.pokemon.name).subscribe((response: Pokemon) => {
    this.pokemonDetail = response;
  })
}

}
