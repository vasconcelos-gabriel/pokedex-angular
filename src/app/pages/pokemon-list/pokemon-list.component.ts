import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonList, Pokemon } from '../../models/pokemon.models';
import { forkJoin, Observable } from 'rxjs';

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

  private loadPokemons(): void {
    this.pokemonService.getPokemonList().subscribe((response: PokemonList) => {
      this.fetchPokemonDetails(response.results).subscribe((details: Pokemon[]) => {
        this.pokemons = details;
        this.filteredPokemons = details;
      });
    });
  }

  private fetchPokemonDetails(results: { name: string; url: string }[]): Observable<Pokemon[]> {
    const detailRequests = results.map((pokemon) => this.getPokemonDetailByUrl(pokemon.url));
    return forkJoin(detailRequests);
  }

  private getPokemonDetailByUrl(url: string): Observable<Pokemon> {
    const id = this.extractPokemonId(url);
    return this.pokemonService.getPokemonDetailsById(id);
  }

  private extractPokemonId(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
  }

  searchPokemon(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
  }
}
