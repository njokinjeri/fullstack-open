import React from 'react'

const CountryDetails = ({ country }) => {
    const languages = Object.values(country.languages || {});
  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0] || 'N/A'}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
    </div>
  )
}

export default CountryDetails