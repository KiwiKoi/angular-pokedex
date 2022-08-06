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

  constructor(){}

  ngOnInit(): void {
    console.log(this.pokemon)
  }

}
