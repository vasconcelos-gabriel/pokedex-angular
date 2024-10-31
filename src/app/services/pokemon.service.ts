import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

export interface PokemonList {
  results: Array<{ name: string; url: string }>;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface Evolution {
  name: string;
  url: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  isLast?: boolean;
}

export interface Pokemon {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  stats?: Array<{ base_stat: number; effort: number; stat: { name: string } }>;
  abilities?: Array<{ ability: { name: string } }>;
  evolutions?: Evolution[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{ type: { name: string } }>;
  flavor_text_entries: FlavorTextEntry[];
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}

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
            pokemon.flavor_text_entries = species.flavor_text_entries;
            return pokemon;
          }),
        );
      }),
    );
  }
}
