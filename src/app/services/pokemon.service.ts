import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Pokemon, PokemonList, PokemonSpecies } from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetailsById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(
      switchMap((pokemon) => {
        return this.http.get<PokemonSpecies>(`${this.baseUrl}-species/${id}`).pipe(
          map((species) => {
            pokemon.flavor_text_entries = species.flavor_text_entries
              .filter((entry) => entry.language.name === 'en')
              .map((entry) => ({
                ...entry,
                flavor_text: entry.flavor_text.replace(/[\n\f\r]/g, ' '),
              }));
            return pokemon;
          }),
        );
      }),
    );
  }
}
