import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/Pokemon'; 

interface PokemonState {
  data: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  return data.results;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default pokemonSlice.reducer;
