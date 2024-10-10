import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/Pokemon';

interface BattleState {
  readyList: Pokemon[];
}

const initialState: BattleState = {
  readyList: [],
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    addPokemonToBattle: (state, action) => {
        const isAlreadyInList = state.readyList.some(pokemon => pokemon.url === action.payload.url);
        if (!isAlreadyInList && state.readyList.length < 6) {
          state.readyList.push(action.payload);
        }
    },
    removePokemonFromBattle: (state, action) => {
        const pokemonIdToRemove = action.payload.url.split('/').filter(Boolean).pop();
        state.readyList = state.readyList.filter(pokemon => {
          const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
          return pokemonId !== pokemonIdToRemove;
        });
      },
  },
});

export const { addPokemonToBattle, removePokemonFromBattle } = battleSlice.actions;
export default battleSlice.reducer;
