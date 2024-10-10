export interface Pokemon {
    id: number;
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
    stats: {
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    };
  }
  