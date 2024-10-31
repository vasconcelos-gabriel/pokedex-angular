import { Component, Input } from '@angular/core';
import { Pokemon } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() pokemonId!: number;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }
}
