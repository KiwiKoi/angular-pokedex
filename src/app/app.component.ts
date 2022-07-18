import { Component } from '@angular/core';
import { Pokemon } from './models/pokemon';
import {PokeDataService} from './services/poke-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Pokedex';

  pokemon!: Pokemon;

constructor(private pokeDataService: PokeDataService){}

ngOnInit(): void {
this.fetchPokemonByID();
console.log(this.pokemon)
}

fetchPokemonByID(){
  this.pokeDataService.getPokemonByID(1).subscribe(res => {
    this.pokemon = res;
  })
}
}
