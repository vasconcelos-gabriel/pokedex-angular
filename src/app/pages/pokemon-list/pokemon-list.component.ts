import { Component, OnInit } from '@angular/core';
import { PokemonList, Pokemon, PokemonService } from '../../services/pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  searchQuery = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemonList().subscribe((response: PokemonList) => {
      const pokemonDetailsRequests = response.results.map((pokemon) => this.pokemonService.getPokemonDetails(pokemon.url));
      forkJoin(pokemonDetailsRequests).subscribe((details: Pokemon[]) => {
        this.pokemons = details;
      });
    });
  }
}
