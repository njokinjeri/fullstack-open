import React from 'react'
import CountryDetails from './CountryDetails';

const CountryList = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }

    if (countries.length > 1) {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>{country.name.common}</li>
                ))}
            </ul>
        );
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />;
    }
  return <p>No matches found!</p>
}

export default CountryList