import React, { useEffect, useState } from 'react';
import { getPokemonDetails } from '../services/api';
import { PokemonDetails } from '../types/Pokemon';

interface PokemonDetailProps {
  id: number;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getPokemonDetails(id);
      setPokemon(data);
    };

    fetchDetails();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} alt={pokemon.name} />
      <h1>{pokemon.name}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      <h2>Stats</h2>
      <ul>
        <li>Attack: {pokemon.stats.attack}</li>
        <li>Defense: {pokemon.stats.defense}</li>
        <li>Special Attack: {pokemon.stats.specialAttack}</li>
        <li>Special Defense: {pokemon.stats.specialDefense}</li>
        <li>Speed: {pokemon.stats.speed}</li>
      </ul>
    </div>
  );
};

export default PokemonDetail;
