import { useEffect, useState } from 'react';
import './App.css';
import { ListOfCountry, SpecificData, Filter, TooManyData } from './component';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [countries, setCountries] = useState([]);
  const [regex, setRegex] = useState(new RegExp(''));

  const handleText = (e) => {
    setText(e.target.value);
    setRegex(new RegExp(e.target.value, "i"));
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(r => setCountries(r.data));
  }, []);

  const countriesName = countries.map((aCountry => {
    return aCountry.name.common;
  }));
  let countries_name_after_search = countriesName.filter(aCountry => {
    return regex.test(aCountry);
  })
  let specificCountry;
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.common === countries_name_after_search[0]) {
      specificCountry = countries[i];
    }
  }
  if (countries_name_after_search.length > 10) {
    <TooManyData />
  }
  const handleShowCountry = (e, country) => {
    e.preventDefault();
    setRegex(new RegExp(country, 'i'));
  }
  function switchCased() {
    if (countries_name_after_search.length === 1) {
      let key = 1;
      const { ...languages } = Object.values(specificCountry['languages']).map((aLanguage, arr) => {
        return <li key={key++}>{aLanguage}</li>
      });

      let prop = {
        country_name: specificCountry.name.common,
        capital_of_country: specificCountry.capital[0],
        area: specificCountry.area,
        flag_img: specificCountry.flags.png,
        flat_alt: specificCountry.flags.alt,
        languages_of_country: Object.values(languages),
        coordinates: specificCountry.latlng
      }
      return <SpecificData prop={prop} />
    } else if (countries_name_after_search.length < 10) {
      return <ListOfCountry handleShowBtn={handleShowCountry} countries_name_after_search={countries_name_after_search} />
    } else {
      return <TooManyData />
    }
  }
  return (
    <>
      <Filter text={text} handleText={handleText} />
      {
        switchCased()
      }
    </>
  );
}

export default App;
