import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search Pokémon" />
  );
};



export default SearchBar;
