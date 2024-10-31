import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/pokemon.models';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: Pokemon;

  statAbbreviations: { [key: string]: string } = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'SPD',
  };

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.loadPokemonDetails();
  }

  private loadPokemonDetails(): void {
    const id = this.getPokemonIdFromRoute();
    if (id) {
      this.pokemonService.getPokemonDetailsById(id).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }

  private getPokemonIdFromRoute(): number | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : null;
  }
}
