import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemon!: Pokemon;
}
