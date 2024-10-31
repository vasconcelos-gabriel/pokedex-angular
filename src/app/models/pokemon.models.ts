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
