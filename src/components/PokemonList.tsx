import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPokemons } from '../store/slices/pokemonSlice';
import { addPokemonToBattle } from '../store/slices/battleSlice';
import { Pokemon } from '../types/Pokemon';
import { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';
import PokemonDetail from './PokemonDetail';
import './PokemonList.css';
import Modal from './Modal'; 

interface PokemonListProps {
    searchTerm: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();

  const pokemons = useSelector((state: RootState) => state.pokemon.data);
  const isLoading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const filteredPokemons = (searchTerm && searchTerm.trim() !== "") 
  ? pokemons.filter((pokemon: Pokemon) => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pokemon.url.split('/').filter(Boolean).pop() === searchTerm
    ) 
  : pokemons;
  
  const handleAddToBattle = (pokemon: Pokemon) => {
    dispatch(addPokemonToBattle(pokemon));
  };

  const openModal = (id: any) => {
    setSelectedPokemonId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemonId(null);
  };

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
         <div className="pokemon-list">
            {filteredPokemons.map((pokemon: Pokemon) => {
                const id = pokemon.url.split('/').filter(Boolean).pop();

                return (
                    <li key={pokemon.name} className="pokemon-item">
                        <div className="pokemon-card">
                            <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt={pokemon.name}
                            />
                            <span>{pokemon.name} </span>
                            <button onClick={() => handleAddToBattle(pokemon)}>+</button>
                            <button onClick={() => openModal(id)}>Details</button>
                        </div>
                    </li>
                );
            })}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPokemonId && <PokemonDetail id={selectedPokemonId} />}
        </Modal>
    </div>
  );
};

export default PokemonList;
