import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeDataService } from '../services/poke-data.service';
import { Location } from '@angular/common';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  public pokemon!: Pokemon;
  public pokemonSpeciesInfo!: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokeDataService: PokeDataService
  ) {}

  ngOnInit(): void {
    this.getPokemonDetail();
    this.getPokemonSpeciesInfo();
  }

  getPokemonDetail(): any {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.pokeDataService
      .getPokemonDetail(id)
      .subscribe((response: any) => {
        this.pokemon = response;
      });
  }
  getPokemonSpeciesInfo(): any {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.pokeDataService
      .getPokemonSpeciesInfo(id)
      .subscribe((response: any) => {
        this.pokemonSpeciesInfo = response;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
