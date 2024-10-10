import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePokemonFromBattle } from '../store/slices/battleSlice';
import { RootState } from '../store';

const BattleReadyList: React.FC = () => {
  const dispatch = useDispatch();
  const readyList = useSelector((state: RootState) => state.battle.readyList);

  if (readyList.length === 0) {
    return <div>No Pokémon ready for battle</div>;
  }

  return (
    <div>
      <h2>Ready for Battle</h2>
      <ul>
        {readyList.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
            return (
                <li key={id}>
                    <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={pokemon.name}
                    />
                <span>{pokemon.name} </span>
                <button onClick={() => dispatch(removePokemonFromBattle(pokemon))}>🗑</button>
                </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BattleReadyList;
