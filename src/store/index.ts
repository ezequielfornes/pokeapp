import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import battleReducer from './slices/battleSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    battle: battleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;