import axios from 'axios';
import { PokemonDetails } from '../types/Pokemon';

export const getPokemonDetails = async (id: number): Promise<PokemonDetails> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, height, weight, stats, types } = response.data;
    return {
      id,
      name,
      height,
      weight,
      types: types.map((type: any) => type.type.name),
      stats: {
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        specialAttack: stats[3].base_stat,
        specialDefense: stats[4].base_stat,
        speed: stats[5].base_stat,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
