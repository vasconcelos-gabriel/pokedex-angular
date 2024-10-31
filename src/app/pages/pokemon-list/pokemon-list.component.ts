import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonList, Pokemon } from '../../models/pokemon.models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchQuery = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemonList().subscribe((response: PokemonList) => {
      const pokemonDetailsRequests = response.results.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return this.pokemonService.getPokemonDetailsById(Number(id));
      });
      forkJoin(pokemonDetailsRequests).subscribe((details: Pokemon[]) => {
        this.pokemons = details;
        this.filteredPokemons = details;
      });
    });
  }

  searchPokemon(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
  }
}
