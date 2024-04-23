import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SearchResultContainer, SearchResultText, SearchResultItem } from './_searchStyle';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    // Fetch search results based on search term from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlParams.get('keyword');

    if (searchKeyword) {
      setKeyword(searchKeyword);

      // Perform search based on the keyword (simulated here)
      // Example: fetching search results from an API
      const fetchSearchResults = async () => {
        // Simulate fetching data
        const data = await fetch(`https://api.example.com/search?keyword=${encodeURIComponent(searchKeyword)}`);
        const results = await data.json();
        setSearchResults(results);
      };

      fetchSearchResults();
    }
  }, []);

  return (
    <SearchResultContainer>
      <h1>Search Result</h1>
      <SearchResultText>Menampilkan {searchResults.length} hasil untuk "{keyword && decodeURIComponent(keyword)}"</SearchResultText>
      {searchResults.map((result, index) => (
        <SearchResultItem key={index}>{result}</SearchResultItem>
      ))}
    </SearchResultContainer>
  );
};

ReactDOM.render(<Search />, document.getElementById('root'));
export default Search;
