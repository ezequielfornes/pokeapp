import React, {useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import BattleReadyList from './components/BattleReadyList';
import './App.css'

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Provider store={store}>
      
        <div className="App">
          <h1>Pokédex</h1>
          <SearchBar onSearch={handleSearch} />
        
        <PokemonList searchTerm={searchTerm} />
        <BattleReadyList />
      </div>
    </Provider>
  );
};


export default App;
