import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { Evolution, EvolutionChain, Pokemon, PokemonList, PokemonSpecies } from '../../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly speciesUrl = `${this.baseUrl}-species`;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 1010, offset: number = 0): Observable<PokemonList> {
    const url = `${this.baseUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonList>(url);
  }

  getPokemonDetailsById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(switchMap((pokemon) => this.getPokemonSpeciesData(id, pokemon)));
  }

  getPokemonEvolutionChain(id: number): Observable<Evolution[]> {
    return this.http.get<PokemonSpecies>(`${this.speciesUrl}/${id}`).pipe(
      switchMap((species) => {
        if (species.evolution_chain?.url) {
          return this.http.get<{ chain: EvolutionChain }>(species.evolution_chain.url);
        }
        return of({ chain: null });
      }),
      map((evolutionData) => (evolutionData.chain ? this.mapEvolutionChain(evolutionData.chain) : [])),
    );
  }

  private mapEvolutionChain(chain: EvolutionChain): Evolution[] {
    const evolutions: Evolution[] = [];
    let currentChain = chain;
    while (currentChain) {
      evolutions.push({
        name: currentChain.species.name,
        sprites: {
          other: {
            'official-artwork': {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentChain.species.url.split('/').slice(-2, -1)}.png`,
            },
          },
        },
      });
      currentChain = currentChain.evolves_to[0];
    }
    return evolutions;
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
