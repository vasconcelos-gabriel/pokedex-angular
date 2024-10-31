import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Pokemon, PokemonList, PokemonSpecies } from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly speciesUrl = `${this.baseUrl}-species`;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonList> {
    const url = `${this.baseUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonList>(url);
  }

  getPokemonDetailsById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(switchMap((pokemon) => this.getPokemonSpeciesData(id, pokemon)));
  }

  private getPokemonSpeciesData(id: number, pokemon: Pokemon): Observable<Pokemon> {
    return this.http.get<PokemonSpecies>(`${this.speciesUrl}/${id}`).pipe(
      map((species) => ({
        ...pokemon,
        flavor_text_entries: this.getEnglishFlavorText(species),
      })),
    );
  }

  private getEnglishFlavorText(species: PokemonSpecies) {
    return species.flavor_text_entries
      .filter((entry) => entry.language.name === 'en')
      .map((entry) => ({
        ...entry,
        flavor_text: entry.flavor_text.replace(/[\n\f\r]/g, ' '),
      }));
  }
}
