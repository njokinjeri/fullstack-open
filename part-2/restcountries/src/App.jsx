import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={handleFilterChange}/>
      </div>
      
      <CountryList countries={filteredCountries}
      setFilter={setFilter} />
    </div>
  );
}

export default App
